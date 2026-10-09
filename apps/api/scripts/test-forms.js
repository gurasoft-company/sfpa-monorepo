require('dotenv').config();

const API_URL = 'http://localhost:3001';

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return res.json();
}

(async () => {
  console.log('📝 Test formulaire adhésion...');
  console.log(await post('/api/public/members', {
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    city: 'Marseille',
    country: 'France',
    membershipType: 'actif',
    motivation: 'Je souhaite soutenir les actions de SFPA.',
  }));

  console.log('\n📝 Test formulaire bénévolat...');
  console.log(await post('/api/public/volunteers', {
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@example.com',
    skills: 'Ingénieur agronome, 10 ans d\'expérience',
    availability: '3 mois par an',
    message: 'Disponible pour former les jeunes en agroécologie.',
  }));

  console.log('\n📝 Test formulaire contact...');
  console.log(await post('/api/public/contact', {
    name: 'Sophie Bernard',
    email: 'sophie.bernard@example.com',
    subject: 'Demande de partenariat',
    message: 'Bonjour, je représente une entreprise...',
  }));
})();