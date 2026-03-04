import { useState, useEffect } from 'react';
import { createReport, fetchReportById, updateReport } from '../services/api';

export default function DailyReport({ navigate, reportId }) {
  const isEditing = Boolean(reportId);

  const [form, setForm] = useState({
    title: '',
    content: '',
    tasks_done: '',
    tasks_planned: '',
    blockers: '',
    report_date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchReportById(reportId).then(result => {
        if (result.success) {
          const r = result.data;
          setForm({
            title: r.title,
            content: r.content,
            tasks_done: r.tasks_done || '',
            tasks_planned: r.tasks_planned || '',
            blockers: r.blockers || '',
            report_date: r.report_date?.split('T')[0] || new Date().toISOString().split('T')[0],
          });
        }
      });
    }
  }, [reportId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = isEditing ? await updateReport(reportId, form) : await createReport(form);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('dashboard'), 1000);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Erreur de connexion au serveur. Vérifiez que le backend est démarré.');
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px',
    border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box',
    fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
    background: 'white'
  };
  const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: '600', color: '#374151', fontSize: '0.95rem' };

  return (
    <div style={{ padding: '2rem', maxWidth: '720px', margin: '0 auto' }}>
      <h1 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>
        {isEditing ? '✏️ Modifier le Rapport' : '📝 Nouveau Rapport Journalier'}
      </h1>

      {success && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>✅ Rapport enregistré ! Redirection...</div>}
      {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'white', padding: '2rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div>
          <label style={labelStyle}>Titre *</label>
          <input name="title" value={form.title} onChange={handleChange} required style={fieldStyle} placeholder="Ex: Rapport du 04 Mars 2026" />
        </div>
        <div>
          <label style={labelStyle}>Date *</label>
          <input type="date" name="report_date" value={form.report_date} onChange={handleChange} required style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Résumé de la journée *</label>
          <textarea name="content" value={form.content} onChange={handleChange} required rows={4} style={fieldStyle} placeholder="Décrivez globalement votre journée de travail..." />
        </div>
        <div>
          <label style={labelStyle}>✅ Tâches accomplies</label>
          <textarea name="tasks_done" value={form.tasks_done} onChange={handleChange} rows={3} style={fieldStyle} placeholder="Ex: Correction bug login, Réunion équipe, Code review..." />
        </div>
        <div>
          <label style={labelStyle}>📌 Tâches prévues pour demain</label>
          <textarea name="tasks_planned" value={form.tasks_planned} onChange={handleChange} rows={3} style={fieldStyle} placeholder="Ex: Déploiement en production, Rédiger documentation..." />
        </div>
        <div>
          <label style={labelStyle}>🚧 Blocages / Problèmes rencontrés</label>
          <textarea name="blockers" value={form.blockers} onChange={handleChange} rows={2} style={fieldStyle} placeholder="Ex: Accès serveur en attente, Aucun..." />
        </div>
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
          <button type="submit" disabled={loading} style={{ background: loading ? '#93c5fd' : '#3b82f6', color: 'white', padding: '0.75rem 2rem', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '600' }}>
            {loading ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer le rapport'}
          </button>
          <button type="button" onClick={() => navigate('dashboard')} style={{ background: '#f1f5f9', color: '#475569', padding: '0.75rem 2rem', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '1rem' }}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}