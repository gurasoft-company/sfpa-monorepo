const sharp = require('sharp');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const { s3Client, bucket, publicUrl } = require('../config/cloudflare');

const THUMBNAIL_WIDTH = 400;
const WEBP_QUALITY = 85;
const THUMB_QUALITY = 80;

/**
 * Convertit un buffer image en WebP (version principale + miniature)
 * et les upload vers Cloudflare R2.
 *
 * @param {Buffer} buffer - Buffer du fichier original
 * @param {string} originalName - Nom original du fichier
 * @param {string} folder - Dossier logique (projects, posts, partners, formations, general)
 * @returns {Promise<Object>} Métadonnées de l'image uploadée
 */
async function processAndUpload(buffer, originalName, folder = 'general') {
  if (!bucket || !publicUrl) {
    throw new Error(
      "Configuration Cloudflare R2 incomplète. Vérifiez vos variables d'environnement."
    );
  }

  const id = uuidv4();
  const cleanFolder = folder.replace(/[^a-z0-9-]/gi, '').toLowerCase() || 'general';
  const baseKey = `${cleanFolder}/${id}`;
  const filename = `${id}.webp`;
  const thumbnailFilename = `${id}-thumb.webp`;

  // 1. Conversion WebP version principale
  const webpBuffer = await sharp(buffer)
    .rotate() // respecte l'orientation EXIF
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  // 2. Miniature
  const thumbBuffer = await sharp(buffer)
    .rotate()
    .resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY })
    .toBuffer();

  // 3. Récupération des métadonnées
  const metadata = await sharp(buffer).metadata();

  // 4. Upload parallèle vers R2
  await Promise.all([
    s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `${cleanFolder}/${filename}`,
        Body: webpBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      })
    ),
    s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `${cleanFolder}/${thumbnailFilename}`,
        Body: thumbBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      })
    ),
  ]);

  // 5. URLs publiques
  const url = `${publicUrl}/${cleanFolder}/${filename}`;
  const thumbnailUrl = `${publicUrl}/${cleanFolder}/${thumbnailFilename}`;

  return {
    filename,
    originalName,
    url,
    thumbnailUrl,
    mimeType: 'image/webp',
    size: webpBuffer.length,
    width: metadata.width || null,
    height: metadata.height || null,
    folder: cleanFolder,
  };
}

/**
 * Supprime un fichier et sa miniature de R2.
 * @param {string} folder
 * @param {string} filename
 */
async function deleteFromR2(folder, filename) {
  const thumbFilename = filename.replace(/\.webp$/, '-thumb.webp');

  await Promise.all([
    s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: `${folder}/${filename}`,
      })
    ),
    s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: `${folder}/${thumbFilename}`,
      })
    ),
  ]);
}

module.exports = {
  processAndUpload,
  deleteFromR2,
};