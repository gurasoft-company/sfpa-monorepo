const { Sequelize, DataTypes } = require('sequelize');
const pg = require('pg');  // ← AJOUT pour Vercel serverless
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

if (!dbConfig) {
  throw new Error(
    `❌ Configuration Sequelize manquante pour l'environnement "${env}". Vérifiez src/config/database.js.`
  );
}

// Instanciation de Sequelize avec les variables DB_*
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectModule: pg,  // ← AJOUT : force Vercel à inclure pg dans le bundle
    logging: dbConfig.logging,
    define: dbConfig.define,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions || {},
  }
);

// Vérification immédiate (fail fast)
if (!sequelize || typeof sequelize.authenticate !== 'function') {
  throw new Error(
    '❌ L\'instance Sequelize est invalide. Vérifiez src/config/database.js.'
  );
}

console.log(
  `✅ Sequelize instancié → ${dbConfig.host}:${dbConfig.port}/${dbConfig.database} (SSL: ${process.env.DB_SSL === 'true' ? 'ON' : 'OFF'})`
);

const db = {
  sequelize,
  Sequelize,
  DataTypes,
};

// =========================================================
// CHARGEMENT DES MODÈLES
// =========================================================
db.User = require('./User')(sequelize, DataTypes);
db.Media = require('./Media')(sequelize, DataTypes);
db.Project = require('./Project')(sequelize, DataTypes);
db.Formation = require('./Formation')(sequelize, DataTypes);
db.Post = require('./Post')(sequelize, DataTypes);
db.Member = require('./Member')(sequelize, DataTypes);
db.Partner = require('./Partner')(sequelize, DataTypes);
db.Volunteer = require('./Volunteer')(sequelize, DataTypes);
db.Contact = require('./Contact')(sequelize, DataTypes);
db.Page = require('./Page')(sequelize, DataTypes);
db.Testimonial = require('./Testimonial')(sequelize, DataTypes);
db.Donation = require('./Donation')(sequelize, DataTypes);

// =========================================================
// ASSOCIATIONS
// =========================================================
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

module.exports = db;