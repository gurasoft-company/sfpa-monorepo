// apps/api/scripts/create-formation.js
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

async function createFormation(token) {
  const formation = {
    title: 'Formation en agroécologie',
    excerpt: 'Apprendre à cultiver la terre durablement',
    description:
      "Cette formation intensive prépare les jeunes aux métiers de l'agriculture durable et de l'agroécologie. Elle combine théorie et pratique sur le terrain.",
    objectives: [
      'Maîtriser les techniques de permaculture',
      'Comprendre la gestion de l\'eau',
      'Produire son compost',
      'Gérer une exploitation durable',
    ],
    duration: '6 mois',
    level: 'Débutant',
    audience: 'Jeunes de 18 à 30 ans',
    category: 'agriculture',
    displayOrder: 1,
    isPublished: true,
  };

  const res = await fetch(`${API_URL}/api/admin/formations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formation),
  });

  const data = await res.json();
  if (!data.success) throw new Error('Création échouée : ' + data.message);
  return data.data.formation;
}

(async () => {
  try {
    console.log('🔐 Connexion...');
    const token = await login();
    console.log('✅ Token obtenu');

    console.log('📝 Création de la formation...');
    const formation = await createFormation(token);
    console.log('✅ Formation créée :');
    console.log('   ID    :', formation.id);
    console.log('   Slug  :', formation.slug);
    console.log('   Titre :', formation.title);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();