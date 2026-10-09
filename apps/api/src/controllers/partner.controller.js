const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { generateUniqueSlug } = require('../services/slug.service');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op } = require('sequelize');

const { Partner, Media } = db;

// ==========================================
// ADMIN
// ==========================================

const createPartner = asyncHandler(async (req, res) => {
  const data = req.body;
  const slug = await generateUniqueSlug(Partner, data.name);

  const partner = await Partner.create({ ...data, slug });

  res.status(201).json({
    success: true,
    message: 'Partenaire créé avec succès',
    data: { partner },
  });
});

const listPartners = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { type, search } = req.query;

  const where = {};
  if (type) where.type = type;
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Partner.findAndCountAll({
    where,
    limit,
    offset,
    order: [['displayOrder', 'ASC'], ['name', 'ASC']],
    include: [
      { model: Media, as: 'logo', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
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

const getPartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findByPk(req.params.id, {
    include: [
      { model: Media, as: 'logo', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
    ],
  });
  if (!partner) throw new ApiError(404, 'Partenaire introuvable');

  res.status(200).json({ success: true, data: { partner } });
});

const updatePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findByPk(req.params.id);
  if (!partner) throw new ApiError(404, 'Partenaire introuvable');

  const data = req.body;

  if (data.name && data.name !== partner.name) {
    data.slug = await generateUniqueSlug(Partner, data.name, partner.id);
  }

  await partner.update(data);

  res.status(200).json({
    success: true,
    message: 'Partenaire mis à jour',
    data: { partner },
  });
});

const deletePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findByPk(req.params.id);
  if (!partner) throw new ApiError(404, 'Partenaire introuvable');

  await partner.destroy();

  res.status(200).json({ success: true, message: 'Partenaire supprimé' });
});

// ==========================================
// PUBLIC
// ==========================================

const listPublicPartners = asyncHandler(async (req, res) => {
  const { type } = req.query;

  const where = { isPublished: true };
  if (type) where.type = type;

  const partners = await Partner.findAll({
    where,
    order: [['displayOrder', 'ASC'], ['name', 'ASC']],
    attributes: ['id', 'slug', 'name', 'type', 'description', 'website', 'country', 'displayOrder'],
    include: [
      { model: Media, as: 'logo', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
    ],
  });

  res.status(200).json({
    success: true,
    data: { items: partners },
  });
});

module.exports = {
  createPartner,
  listPartners,
  getPartner,
  updatePartner,
  deletePartner,
  listPublicPartners,
};