const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// GET all reports
const getAllReports = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports ORDER BY report_date DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// GET single report by ID
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Rapport non trouvé' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// POST create new report
const createReport = async (req, res) => {
  try {
    const { title, content, tasks_done, tasks_planned, blockers, report_date } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Titre et contenu sont requis' });
    }

    const id = uuidv4();
    const date = report_date || new Date().toISOString().split('T')[0];

    await pool.query(
      `INSERT INTO reports (id, title, content, tasks_done, tasks_planned, blockers, report_date, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [id, title, content, tasks_done || '', tasks_planned || '', blockers || '', date]
    );

    const [newReport] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
    res.status(201).json({ success: true, data: newReport[0], message: 'Rapport créé avec succès' });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// PUT update report
const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tasks_done, tasks_planned, blockers, report_date } = req.body;

    const [existing] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Rapport non trouvé' });
    }

    await pool.query(
      `UPDATE reports SET title=?, content=?, tasks_done=?, tasks_planned=?, blockers=?, report_date=?, updated_at=NOW()
       WHERE id=?`,
      [
        title || existing[0].title,
        content || existing[0].content,
        tasks_done !== undefined ? tasks_done : existing[0].tasks_done,
        tasks_planned !== undefined ? tasks_planned : existing[0].tasks_planned,
        blockers !== undefined ? blockers : existing[0].blockers,
        report_date || existing[0].report_date,
        id
      ]
    );

    const [updated] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
    res.json({ success: true, data: updated[0], message: 'Rapport mis à jour' });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// DELETE report
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await pool.query('SELECT * FROM reports WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Rapport non trouvé' });
    }

    await pool.query('DELETE FROM reports WHERE id = ?', [id]);
    res.json({ success: true, message: 'Rapport supprimé avec succès' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { getAllReports, getReportById, createReport, updateReport, deleteReport };