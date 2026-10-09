// apps/api/scripts/create-page.js
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

async function createPage(token) {
  const page = {
    slug: 'accueil',
    title: 'Accueil',
    metaTitle: 'SFPA — Un cœur pour la Terre et les Hommes',
    metaDescription:
      "Solidarité Fraternelle Provence Afrique : formation professionnelle des jeunes en Afrique, humanitaire et environnement.",
    isPublished: true,
    content: {
      hero: {
        title: 'Un cœur pour la Terre et les Hommes',
        subtitle: 'Humanitaire & Environnement — Provence & Afrique',
        cta: {
          label: 'Découvrir nos actions',
          url: '/actions',
        },
      },
      sections: [
        {
          type: 'text',
          title: 'Qui sommes-nous ?',
          body: "<p>SFPA est une association qui forme les jeunes d'Afrique aux métiers techniques et professionnels, tout en protégeant l'environnement.</p>",
        },
        {
          type: 'stats',
          items: [
            { value: '50', label: 'Jeunes formés' },
            { value: '3', label: "Pays d'intervention" },
            { value: '100%', label: 'Bénévoles engagés' },
          ],
        },
      ],
    },
  };

  const res = await fetch(`${API_URL}/api/admin/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(page),
  });

  const data = await res.json();
  if (!data.success) throw new Error('Création échouée : ' + data.message);
  return data.data.page;
}

(async () => {
  try {
    console.log('🔐 Connexion...');
    const token = await login();
    console.log('✅ Token obtenu');

    console.log('📝 Création de la page...');
    const page = await createPage(token);
    console.log('✅ Page créée :');
    console.log('   ID    :', page.id);
    console.log('   Slug  :', page.slug);
    console.log('   Titre :', page.title);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();