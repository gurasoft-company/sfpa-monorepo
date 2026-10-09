const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { generateUniqueSlug } = require('../services/slug.service');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op } = require('sequelize');

const { Formation, Media } = db;

// ==========================================
// ADMIN
// ==========================================

const createFormation = asyncHandler(async (req, res) => {
  const data = req.body;
  const slug = await generateUniqueSlug(Formation, data.title);

  const formation = await Formation.create({ ...data, slug });

  res.status(201).json({
    success: true,
    message: 'Formation créée avec succès',
    data: { formation },
  });
});

const listFormations = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { category, search } = req.query;

  const where = {};
  if (category) where.category = category;
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { excerpt: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Formation.findAndCountAll({
    where,
    limit,
    offset,
    order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
    include: [
      { model: Media, as: 'coverImage', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
    ],
  });

  res.status(200).json({
    success: true,
    data: {
      items: rows,
      pagination: getPaginationMeta(count, page, limit),
    },
  });
});

const getFormation = asyncHandler(async (req, res) => {
  const formation = await Formation.findByPk(req.params.id, {
    include: [
      { model: Media, as: 'coverImage', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
    ],
  });
  if (!formation) throw new ApiError(404, 'Formation introuvable');

  res.status(200).json({ success: true, data: { formation } });
});

const updateFormation = asyncHandler(async (req, res) => {
  const formation = await Formation.findByPk(req.params.id);
  if (!formation) throw new ApiError(404, 'Formation introuvable');

  const data = req.body;

  if (data.title && data.title !== formation.title) {
    data.slug = await generateUniqueSlug(Formation, data.title, formation.id);
  }

  await formation.update(data);

  res.status(200).json({
    success: true,
    message: 'Formation mise à jour',
    data: { formation },
  });
});

const deleteFormation = asyncHandler(async (req, res) => {
  const formation = await Formation.findByPk(req.params.id);
  if (!formation) throw new ApiError(404, 'Formation introuvable');

  await formation.destroy();

  res.status(200).json({ success: true, message: 'Formation supprimée' });
});

// ==========================================
// PUBLIC
// ==========================================

const listPublicFormations = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const where = { isPublished: true };
  if (category) where.category = category;

  const formations = await Formation.findAll({
    where,
    order: [['displayOrder', 'ASC'], ['title', 'ASC']],
    attributes: [
      'id', 'slug', 'title', 'excerpt', 'duration', 'level',
      'audience', 'category', 'displayOrder',
    ],
    include: [
      { model: Media, as: 'coverImage', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
    ],
  });

  res.status(200).json({ success: true, data: { items: formations } });
});

const getPublicFormation = asyncHandler(async (req, res) => {
  const formation = await Formation.findOne({
    where: { slug: req.params.slug, isPublished: true },
    include: [
      { model: Media, as: 'coverImage', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
    ],
  });
  if (!formation) throw new ApiError(404, 'Formation introuvable');

  res.status(200).json({ success: true, data: { formation } });
});

module.exports = {
  createFormation,
  listFormations,
  getFormation,
  updateFormation,
  deleteFormation,
  listPublicFormations,
  getPublicFormation,
};