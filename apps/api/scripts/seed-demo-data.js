require('dotenv').config();
const db = require('../src/models');
const { Project, Post, Media } = db;

async function seedDemoData() {
  console.log('🌱 Ajout des images de démonstration...\n');

  // ==========================================
  // 1. PROJET
  // ==========================================
  const project = await Project.findOne({
    where: { slug: 'formation-en-agroecologie-au-togo' },
  });

  if (project) {
    const media = await Media.create({
      filename: 'demo-agroecologie.webp',
      originalName: 'demo-agroecologie.jpg',
      url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2070&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=400&auto=format&fit=crop',
      mimeType: 'image/webp',
      size: 12345,
      width: 2070,
      height: 1380,
      alt: 'Jeunes en formation agroécologique',
      folder: 'projects',
    });
    await project.update({ coverImageId: media.id });
    console.log('✅ Projet mis à jour — coverImageId:', media.id);
  } else {
    console.log('⚠️  Projet introuvable');
  }

  // ==========================================
  // 2. ARTICLE
  // ==========================================
  const post = await Post.findOne({
    where: { slug: 'notre-premiere-formation-en-agroecologie-demarre-2' },
  });

  if (post) {
    console.log('   Article trouvé :', post.title);
    const media = await Media.create({
      filename: 'demo-actualite.webp',
      originalName: 'demo-actualite.jpg',
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop',
      mimeType: 'image/webp',
      size: 12345,
      width: 2070,
      height: 1380,
      alt: 'Lancement de la première promotion',
      folder: 'posts',
    });
    console.log('   Media créé :', media.id);

    await post.update({ coverImageId: media.id });
    console.log('✅ Article mis à jour — coverImageId:', media.id);
  } else {
    console.log('⚠️  Article introuvable');
  }

  console.log('\n🎉 Terminé !');
  await db.sequelize.close();
  process.exit(0);
}

seedDemoData().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});