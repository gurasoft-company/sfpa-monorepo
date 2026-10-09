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

(async () => {
  try {
    // 1. Soumission publique (pending)
    console.log('📝 Soumission d\'un témoignage public...');
    const publicRes = await fetch(`${API_URL}/api/public/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        authorName: 'Awa Diallo',
        authorEmail: 'awa@example.com',
        authorRole: 'Ancienne formée en agroécologie',
        authorLocation: 'Togo',
        quote:
          "Grâce à SFPA, j'ai appris à cultiver la terre sans produits chimiques. Aujourd'hui, mon champ nourrit ma famille et je vends le surplus au marché.",
        rating: 5,
      }),
    });
    const publicData = await publicRes.json();
    console.log('   →', publicData.message);
    console.log('   → ID créé :', publicData.data.id);

    // 2. Vérifier qu'il n'apparaît PAS en public
    console.log('\n🔒 Vérification qu\'il est bien caché (statut pending)...');
    const listPublicRes = await fetch(`${API_URL}/api/public/testimonials`);
    const listPublicData = await listPublicRes.json();
    console.log('   → Témoignages visibles publiquement :', listPublicData.data.items.length);

    // 3. Login admin
    console.log('\n🔐 Connexion admin...');
    const token = await login();
    console.log('   → Token obtenu');

    // 4. Approuver le témoignage
    console.log('\n✅ Approbation du témoignage...');
    const approveRes = await fetch(
      `${API_URL}/api/admin/testimonials/${publicData.data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'approved', isFeatured: true }),
      }
    );
    const approveData = await approveRes.json();
    console.log('   →', approveData.message);

    // 5. Vérifier qu'il apparaît maintenant en public
    console.log('\n🌍 Vérification qu\'il est maintenant public...');
    const finalRes = await fetch(`${API_URL}/api/public/testimonials`);
    const finalData = await finalRes.json();
    console.log('   → Témoignages visibles publiquement :', finalData.data.items.length);
    if (finalData.data.items.length > 0) {
      console.log('   → Auteur :', finalData.data.items[0].authorName);
      console.log('   → Citation :', finalData.data.items[0].quote.substring(0, 60) + '...');
    }
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();