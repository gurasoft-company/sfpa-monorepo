// Point d'entrée Vercel Serverless
// Vercel appelle ce fichier pour chaque requête HTTP

const app = require('../src/app');

module.exports = app;