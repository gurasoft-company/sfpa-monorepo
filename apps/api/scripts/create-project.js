// apps/api/scripts/create-project.js
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

async function createProject(token) {
  const project = {
    title: 'Formation en agroécologie au Togo',
    excerpt: 'Former les jeunes aux techniques agricoles durables',
    description:
      "Ce projet vise à former 50 jeunes aux pratiques agroécologiques adaptées au changement climatique. Les formations couvrent la permaculture, la gestion de l'eau, et les techniques de compostage.",
    category: 'agriculture',
    country: 'Togo',
    status: 'en_cours',
    isPublished: true,
  };

  const res = await fetch(`${API_URL}/api/admin/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });

  const data = await res.json();
  if (!data.success) throw new Error('Création échouée : ' + data.message);
  return data.data.project;
}

(async () => {
  try {
    console.log('🔐 Connexion...');
    const token = await login();
    console.log('✅ Token obtenu');

    console.log('📝 Création du projet...');
    const project = await createProject(token);
    console.log('✅ Projet créé :');
    console.log('   ID    :', project.id);
    console.log('   Slug  :', project.slug);
    console.log('   Titre :', project.title);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();