const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const imageService = require('../services/image.service');
const { getPagination, getPaginationMeta } = require('../utils/pagination');

const { Media } = db;

/**
 * POST /api/admin/media/upload
 * Upload une image → conversion WebP → Cloudflare R2 → enregistrement en base
 */
const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Aucun fichier fourni');
  }

  const { folder = 'general', alt = '', caption = '' } = req.body;

  // Traitement + upload vers R2
  const uploaded = await imageService.processAndUpload(
    req.file.buffer,
    req.file.originalname,
    folder
  );

  // Enregistrement en base
  const media = await Media.create({
    ...uploaded,
    alt,
    caption,
    uploadedById: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: 'Image uploadée avec succès',
    data: { media },
  });
});

/**
 * GET /api/admin/media
 * Liste paginée des médias
 */
const listMedia = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { folder } = req.query;

  const where = {};
  if (folder) where.folder = folder;

  const { count, rows } = await Media.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: {
      items: rows,
      pagination: getPaginationMeta(count, page, limit),
    },
  });
});

/**
 * GET /api/admin/media/:id
 */
const getMedia = asyncHandler(async (req, res) => {
  const media = await Media.findByPk(req.params.id);
  if (!media) throw new ApiError(404, 'Média introuvable');

  res.status(200).json({
    success: true,
    data: { media },
  });
});

/**
 * DELETE /api/admin/media/:id
 */
const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findByPk(req.params.id);
  if (!media) throw new ApiError(404, 'Média introuvable');

  // Supprimer les fichiers sur R2
  try {
    await imageService.deleteFromR2(media.folder, media.filename);
  } catch (err) {
    console.warn('⚠️ Erreur suppression R2 :', err.message);
  }

  await media.destroy();

  res.status(200).json({
    success: true,
    message: 'Média supprimé',
  });
});

module.exports = {
  uploadMedia,
  listMedia,
  getMedia,
  deleteMedia,
};