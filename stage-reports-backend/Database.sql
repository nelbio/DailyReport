-- Créer la base de données
CREATE DATABASE IF NOT EXISTS daily_reports CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE daily_reports;

-- Table des rapports journaliers
CREATE TABLE IF NOT EXISTS reports (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  tasks_done TEXT,
  tasks_planned TEXT,
  blockers TEXT,
  report_date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Données de test
INSERT INTO reports (id, title, content, tasks_done, tasks_planned, blockers, report_date) VALUES
(UUID(), 'Rapport du 01/03/2026', 'Journée productive sur le projet backend', 'Mise en place des routes API, Configuration de la base de données', 'Intégration frontend-backend, Tests des endpoints', 'Aucun', '2026-03-01'),
(UUID(), 'Rapport du 02/03/2026', 'Travail sur le frontend React', 'Création des composants Dashboard et ReportForm', 'Finaliser le formulaire de création de rapport', 'Problème de CORS résolu', '2026-03-02');