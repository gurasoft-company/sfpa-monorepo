require('dotenv').config();

const API_URL = 'http://localhost:3001';
const ADMIN_EMAIL = 'admin@sfpa.org';
const ADMIN_PASSWORD = 'MotDePasse2026!';

const HERO_IMAGE_ID = '77d90593-5b73-4923-bdb7-5f512f0b5261';

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

async function findPageBySlug(token, slug) {
  const res = await fetch(`${API_URL}/api/admin/pages?search=${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!data.success) throw new Error('Recherche échouée');
  return data.data.items.find((p) => p.slug === slug);
}

async function updatePage(token, id, payload) {
  const res = await fetch(`${API_URL}/api/admin/pages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) throw new Error('Update échoué : ' + data.message);
  return data.data.page;
}

(async () => {
  try {
    console.log('🔐 Connexion...');
    const token = await login();
    console.log('✅ Token obtenu');

    console.log('🔍 Recherche de la page accueil...');
    const page = await findPageBySlug(token, 'accueil');
    if (!page) throw new Error('Page "accueil" introuvable');
    console.log('✅ Page trouvée :', page.id);
    console.log('   Ancien titre hero :', page.content?.hero?.title);

    console.log('📝 Mise à jour...');

    const newContent = {
      hero: {
        title: 'La Terre entre nos mains, la fraternité dans nos cœurs.',
        subtitle:
          'Former la jeunesse africaine aux métiers de demain — en Provence et en Afrique.',
        imageId: HERO_IMAGE_ID,
        cta: {
          label: 'Découvrir nos actions',
          url: '/actions',
        },
      },
      sections: page.content?.sections || [],
    };

    const updated = await updatePage(token, page.id, {
      content: newContent,
      metaTitle: 'SFPA — La Terre entre nos mains, la fraternité dans nos cœurs',
      metaDescription:
        'Solidarité Fraternelle Provence Afrique : former la jeunesse africaine aux métiers de demain, en Provence et en Afrique.',
    });

    console.log('✅ Page mise à jour !');
    console.log('');
    console.log('   Titre hero  :', updated.content.hero.title);
    console.log('   Sous-titre  :', updated.content.hero.subtitle);
    console.log('   Image ID    :', updated.content.hero.imageId);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();