// apps/api/scripts/create-partner.js
require('dotenv').config();

const API_URL = 'http://localhost:3001';
const ADMIN_EMAIL = 'admin@sfpa.org';
const ADMIN_PASSWORD = 'MotDePasse2026!';

async function login() {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const data = await res.json();
  if (!data.success) throw new Error('Login échoué : ' + data.message);
  return data.data.token;
}

async function createPartner(token) {
  const partner = {
    name: 'Mairie de Salon-de-Provence',
    type: 'collectivite',
    description:
      "Partenaire institutionnel de SFPA, la Mairie de Salon-de-Provence soutient nos actions humanitaires et environnementales.",
    website: 'https://www.salondeprovence.fr',
    country: 'France',
    displayOrder: 1,
    isPublished: true,
  };

  const res = await fetch(`${API_URL}/api/admin/partners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(partner),
  });

  const data = await res.json();
  if (!data.success) throw new Error('Création échouée : ' + data.message);
  return data.data.partner;
}

(async () => {
  try {
    console.log('🔐 Connexion...');
    const token = await login();
    console.log('✅ Token obtenu');

    console.log('📝 Création du partenaire...');
    const partner = await createPartner(token);
    console.log('✅ Partenaire créé :');
    console.log('   ID    :', partner.id);
    console.log('   Slug  :', partner.slug);
    console.log('   Nom   :', partner.name);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();