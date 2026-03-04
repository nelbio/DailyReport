import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DailyReport from './pages/DailyReport';
import './App.css';

function App() {
  const [page, setPage] = useState({ name: 'dashboard', id: null });

  const navigate = (name, id = null) => setPage({ name, id });

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container">
        {page.name === 'dashboard' && <Dashboard navigate={navigate} />}
        {(page.name === 'new' || page.name === 'edit') && (
          <DailyReport navigate={navigate} reportId={page.id} />
        )}
      </div>
    </>
  );
}

export default App;