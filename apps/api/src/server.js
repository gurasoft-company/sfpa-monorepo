require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test de la connexion à la base de données
    await sequelize.authenticate();
    console.log('✅ Connexion à PostgreSQL établie.');

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur SFPA API démarré sur le port ${PORT}`);
      console.log(`🌍 Environnement : ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Impossible de démarrer le serveur :', error);
    process.exit(1);
  }
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();