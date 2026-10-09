// apps/api/scripts/create-post.js
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

async function createPost(token) {
  const post = {
    title: 'Notre première formation en agroécologie démarre',
    excerpt:
      "C'est officiel : la première promotion de 50 jeunes se lance dans notre programme de formation en agroécologie au Togo.",
    content:
      "<p>Après plusieurs mois de préparation, notre programme de formation en agroécologie a officiellement démarré.</p><p>50 jeunes sélectionnés participent à un cursus intensif de 6 mois, encadrés par des formateurs bénévoles venus de Provence.</p><p>Objectif : leur donner des compétences concrètes, utilisables immédiatement sur le terrain.</p>",
    category: 'Actualité',
    tags: ['formation', 'agroécologie', 'jeunesse'],
    isPublished: true,
  };

  const res = await fetch(`${API_URL}/api/admin/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  if (!data.success) throw new Error('Création échouée : ' + data.message);
  return data.data.post;
}

(async () => {
  try {
    console.log('🔐 Connexion...');
    const token = await login();
    console.log('✅ Token obtenu');

    console.log('📝 Création de l\'article...');
    const post = await createPost(token);
    console.log('✅ Article créé :');
    console.log('   ID    :', post.id);
    console.log('   Slug  :', post.slug);
    console.log('   Titre :', post.title);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();