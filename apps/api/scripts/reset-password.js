/**
 * Réinitialise le mot de passe d'un utilisateur SFPA
 * Usage : node apps/api/scripts/reset-password.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const bcrypt = require('bcryptjs');
const db = require('../src/models');

// ⬇️ CONFIGURE ICI
const EMAIL = 'jtrista3honorovitch93@gmail.com';
const NEW_PASSWORD = 'MotDePasse2026!';
// ⬆️

async function main() {
  console.log(`\n🔐 Réinitialisation du mot de passe...`);
  console.log(`   Email    : ${EMAIL}`);
  console.log(`   Nouveau  : ${NEW_PASSWORD}\n`);

  await db.sequelize.authenticate();
  console.log('✅ Connexion à PostgreSQL établie.');

  const { User } = db;

  const user = await User.scope('withPassword').findOne({ where: { email: EMAIL } });

  if (!user) {
    console.error(`\n❌ Aucun utilisateur trouvé avec l'email "${EMAIL}"\n`);
    console.error('💡 Liste des utilisateurs existants :');
    const all = await User.unscoped().findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
    });
    all.forEach((u) =>
      console.log(`   - ${u.email} (${u.firstName} ${u.lastName}, ${u.role})`)
    );
    await db.sequelize.close();
    process.exit(1);
  }

  const hash = await bcrypt.hash(NEW_PASSWORD, 12);
  await user.update({ password: hash }, { hooks: false });

  console.log(`\n✅ Mot de passe réinitialisé pour :`);
  console.log(`   ${user.firstName} ${user.lastName}`);
  console.log(`   ${user.email} (${user.role})\n`);
  console.log(`🔓 Tu peux te connecter avec :\n   ${EMAIL}\n   ${NEW_PASSWORD}\n`);

  await db.sequelize.close();
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Erreur :', err.message);
  console.error(err);
  process.exit(1);
});