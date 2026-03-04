export default function Navbar({ navigate }) {
  return (
    <nav style={{ background: '#1e293b', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span onClick={() => navigate('dashboard')} style={{ color: '#60a5fa', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer' }}>
        📋 Daily Reports
      </span>
      <button onClick={() => navigate('new')} style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
        + Nouveau Rapport
      </button>
    </nav>
  );
}