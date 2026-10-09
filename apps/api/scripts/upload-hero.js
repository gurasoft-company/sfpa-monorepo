require('dotenv').config();
const fs = require('fs');
const path = require('path');

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

async function uploadImage(token, filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  // Construction du FormData
  const formData = new FormData();
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
  formData.append('image', blob, fileName);
  formData.append('folder', 'pages');
  formData.append('alt', 'La Terre entre nos mains — Hero accueil SFPA');

  const res = await fetch(`${API_URL}/api/admin/media/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  if (!data.success) throw new Error('Upload échoué : ' + data.message);
  return data.data.media;
}

(async () => {
  try {
    const filePath = path.resolve(__dirname, '..', 'hero-accueil.jpg');

    if (!fs.existsSync(filePath)) {
      throw new Error(`Fichier introuvable : ${filePath}`);
    }

    console.log('🔐 Connexion...');
    const token = await login();
    console.log('✅ Token obtenu');

    console.log('📤 Upload de l\'image...');
    const media = await uploadImage(token, filePath);
    console.log('✅ Image uploadée :');
    console.log('   ID          :', media.id);
    console.log('   URL         :', media.url);
    console.log('   Miniature   :', media.thumbnailUrl);
    console.log('   Dimensions  :', media.width, 'x', media.height);
    console.log('');
    console.log('📋 COPIE CET ID :', media.id);
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();