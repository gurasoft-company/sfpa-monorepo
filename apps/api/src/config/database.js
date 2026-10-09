require('dotenv').config();

// Configuration de base commune
const baseConfig = {
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
    freezeTableName: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Configuration SSL conditionnelle (obligatoire pour Supabase)
const sslConfig =
  process.env.DB_SSL === 'true'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // Supabase utilise des certificats auto-signés en pooler
          },
        },
      }
    : {};

module.exports = {
  development: {
    ...baseConfig,
    ...sslConfig,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },

  test: {
    ...baseConfig,
    ...sslConfig,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    logging: false,
  },

  production: {
    ...baseConfig,
    ...sslConfig,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    logging: false,
  },
};