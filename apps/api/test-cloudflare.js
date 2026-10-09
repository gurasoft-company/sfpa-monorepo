// apps/api/test-cloudflare.js
require('dotenv').config();
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { s3Client, bucket, publicUrl } = require('./src/config/cloudflare');

async function main() {
  console.log('');
  console.log('🧪 Test de connexion à Cloudflare R2');
  console.log('════════════════════════════════════════');

  // 1. Vérifier les variables d'env
  console.log('Bucket         :', bucket);
  console.log('Public URL     :', publicUrl);
  console.log('Account ID     :', process.env.R2_ACCOUNT_ID ? '✅' : '❌');
  console.log('Access Key ID  :', process.env.R2_ACCESS_KEY_ID ? '✅' : '❌');
  console.log('Secret Key     :', process.env.R2_SECRET_ACCESS_KEY ? '✅' : '❌');
  console.log('────────────────────────────────────────');

  // 2. Vraie requête vers R2
  try {
    const cmd = new ListObjectsV2Command({
      Bucket: bucket,
      MaxKeys: 5,
    });
    const response = await s3Client.send(cmd);
    console.log('✅ Connexion R2 réussie !');
    console.log('Objets trouvés  :', response.KeyCount || 0);
    if (response.Contents && response.Contents.length > 0) {
      response.Contents.forEach((obj) => {
        console.log('  →', obj.Key, `(${obj.Size} octets)`);
      });
    } else {
      console.log('   (bucket vide pour l\'instant)');
    }
  } catch (error) {
    console.error('❌ Erreur de connexion R2 :');
    console.error('   ', error.name, '-', error.message);
    process.exit(1);
  }

  console.log('════════════════════════════════════════');
  console.log('');
  process.exit(0);
}

main();