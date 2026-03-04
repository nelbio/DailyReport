const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS - doit être AVANT toutes les routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '✅ Daily Reports API is running', status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;