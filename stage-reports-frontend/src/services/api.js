const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const fetchReports = async () => {
  const res = await fetch(`${API_BASE_URL}/reports`);
  return res.json();
};

export const fetchReportById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/reports/${id}`);
  return res.json();
};

export const createReport = async (data) => {
  const res = await fetch(`${API_BASE_URL}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateReport = async (id, data) => {
  const res = await fetch(`${API_BASE_URL}/reports/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteReport = async (id) => {
  const res = await fetch(`${API_BASE_URL}/reports/${id}`, { method: 'DELETE' });
  return res.json();
};