/**
 * Réinitialise le mot de passe d'un utilisateur admin SFPA
 * Usage : node apps/api/scripts/reset-admin.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const bcrypt = require('bcryptjs');
const db = require('../src/models');

const EMAIL = 'admin@sfpa.org';
const NEW_PASSWORD = 'MotDePasse2026!';

async function main() {
  console.log(`\n🔐 Réinitialisation du mot de passe...`);
  console.log(`   Email    : ${EMAIL}`);
  console.log(`   Nouveau  : ${NEW_PASSWORD}\n`);

  await db.sequelize.authenticate();
  console.log('✅ Connexion à PostgreSQL établie.');

  const { User } = db;

  // Trouver l'utilisateur avec le password inclus
  const user = await User.scope('withPassword').findOne({ where: { email: EMAIL } });

  if (!user) {
    console.error(`❌ Aucun utilisateur trouvé avec l'email "${EMAIL}"`);
    console.error(`💡 Vérifie la table users en base, ou change EMAIL dans ce script.`);
    process.exit(1);
  }

  // Hasher le nouveau mot de passe directement
  // (on bypasse le hook beforeUpdate en utilisant update direct)
  const hash = await bcrypt.hash(NEW_PASSWORD, 12);
  await user.update({ password: hash }, { hooks: false });

  console.log(`✅ Mot de passe réinitialisé pour : ${user.firstName} ${user.lastName} (${user.email})`);
  console.log(`\n🔓 Tu peux te connecter avec :\n   ${EMAIL} / ${NEW_PASSWORD}\n`);

  await db.sequelize.close();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  console.error(err);
  process.exit(1);
});