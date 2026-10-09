const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op } = require('sequelize');

const { Page, User } = db;

// ==========================================
// ADMIN
// ==========================================

const createPage = asyncHandler(async (req, res) => {
  const data = req.body;

  // Vérifier que le slug n'existe pas déjà
  const existing = await Page.findOne({ where: { slug: data.slug } });
  if (existing) {
    throw new ApiError(409, `Une page avec le slug "${data.slug}" existe déjà`);
  }

  const page = await Page.create({
    ...data,
    updatedById: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: 'Page créée avec succès',
    data: { page },
  });
});

const listPages = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { search, isPublished } = req.query;

  const where = {};
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { slug: { [Op.iLike]: `%${search}%` } },
    ];
  }
  if (isPublished !== undefined) {
    where.isPublished = isPublished === 'true';
  }

  const { count, rows } = await Page.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: User,
        as: 'updatedBy',
        attributes: ['id', 'firstName', 'lastName'],
      },
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

const getPage = asyncHandler(async (req, res) => {
  const page = await Page.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'updatedBy',
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
  });

  if (!page) throw new ApiError(404, 'Page introuvable');

  res.status(200).json({
    success: true,
    data: { page },
  });
});

const updatePage = asyncHandler(async (req, res) => {
  const page = await Page.findByPk(req.params.id);
  if (!page) throw new ApiError(404, 'Page introuvable');

  const data = req.body;

  // Si le slug change, vérifier qu'il n'entre pas en conflit
  if (data.slug && data.slug !== page.slug) {
    const existing = await Page.findOne({
      where: { slug: data.slug, id: { [Op.ne]: page.id } },
    });
    if (existing) {
      throw new ApiError(409, `Le slug "${data.slug}" est déjà utilisé`);
    }
  }

  // Toujours enregistrer qui a fait la dernière modif
  data.updatedById = req.user.id;

  await page.update(data);

  res.status(200).json({
    success: true,
    message: 'Page mise à jour',
    data: { page },
  });
});

const deletePage = asyncHandler(async (req, res) => {
  const page = await Page.findByPk(req.params.id);
  if (!page) throw new ApiError(404, 'Page introuvable');

  await page.destroy();

  res.status(200).json({
    success: true,
    message: 'Page supprimée',
  });
});

// ==========================================
// PUBLIC
// ==========================================

const getPublicPage = asyncHandler(async (req, res) => {
  const page = await Page.findOne({
    where: { slug: req.params.slug, isPublished: true },
    attributes: ['id', 'slug', 'title', 'content', 'metaTitle', 'metaDescription', 'updatedAt'],
  });

  if (!page) throw new ApiError(404, 'Page introuvable');

  res.status(200).json({
    success: true,
    data: { page },
  });
});

module.exports = {
  createPage,
  listPages,
  getPage,
  updatePage,
  deletePage,
  getPublicPage,
};