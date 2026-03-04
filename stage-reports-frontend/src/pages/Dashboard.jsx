import { useState, useEffect } from 'react';
import { fetchReports, deleteReport } from '../services/api';

export default function Dashboard({ navigate }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReports = async () => {
    setLoading(true);
    try {
      const result = await fetchReports();
      if (result.success) setReports(result.data);
      else setError(result.message);
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez que le backend tourne sur le port 5001.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReports(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce rapport ?')) return;
    const result = await deleteReport(id);
    if (result.success) loadReports();
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>⏳ Chargement...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Mes Rapports Journaliers</h1>
      {error && (
        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}
      {reports.length === 0 && !error ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '1.1rem' }}>Aucun rapport pour le moment.</p>
          <button onClick={() => navigate('new')} style={{ marginTop: '1rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
            Créer votre premier rapport →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reports.map(report => (
            <div key={report.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem' }}>{report.title}</h2>
                  <p style={{ color: '#64748b', margin: '0.25rem 0', fontSize: '0.875rem' }}>
                    📅 {new Date(report.report_date).toLocaleDateString('fr-FR')}
                  </p>
                  <p style={{ color: '#475569', margin: '0.5rem 0 0', lineHeight: '1.5' }}>
                    {report.content.length > 120 ? report.content.substring(0, 120) + '...' : report.content}
                  </p>
                  {report.tasks_done && (
                    <p style={{ color: '#059669', margin: '0.4rem 0 0', fontSize: '0.875rem' }}>
                      ✅ {report.tasks_done.substring(0, 80)}{report.tasks_done.length > 80 ? '...' : ''}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button onClick={() => navigate('edit', report.id)} style={{ background: '#3b82f6', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(report.id)} style={{ background: '#ef4444', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}