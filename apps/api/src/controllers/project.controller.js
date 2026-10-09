const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { generateUniqueSlug } = require('../services/slug.service');
const { getPagination, getPaginationMeta } = require('../utils/pagination');

const { Project, Media } = db;

// ==========================================
// ADMIN — CRUD
// ==========================================

/**
 * POST /api/admin/projects
 */
const createProject = asyncHandler(async (req, res) => {
  const data = req.body;

  // Générer un slug unique
  const slug = await generateUniqueSlug(Project, data.title);

  // Si publié, définir publishedAt
  const publishedAt = data.isPublished ? new Date() : null;

  const project = await Project.create({
    ...data,
    slug,
    publishedAt,
    createdById: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: 'Projet créé avec succès',
    data: { project },
  });
});

/**
 * GET /api/admin/projects
 */
const listProjects = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { category, status, search } = req.query;

  const where = {};
  if (category) where.category = category;
  if (status) where.status = status;
  if (search) {
    const { Op } = require('sequelize');
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { excerpt: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Project.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Media,
        as: 'coverImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
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

/**
 * GET /api/admin/projects/:id
 */
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    include: [
      {
        model: Media,
        as: 'coverImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
      },
    ],
  });

  if (!project) throw new ApiError(404, 'Projet introuvable');

  res.status(200).json({
    success: true,
    data: { project },
  });
});

/**
 * PUT /api/admin/projects/:id
 */
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) throw new ApiError(404, 'Projet introuvable');

  const data = req.body;

  // Regénérer le slug si le titre a changé
  if (data.title && data.title !== project.title) {
    data.slug = await generateUniqueSlug(Project, data.title, project.id);
  }

  // Gérer la publication
  if (data.isPublished !== undefined) {
    if (data.isPublished && !project.isPublished) {
      data.publishedAt = new Date();
    } else if (!data.isPublished && project.isPublished) {
      data.publishedAt = null;
    }
  }

  await project.update(data);

  res.status(200).json({
    success: true,
    message: 'Projet mis à jour',
    data: { project },
  });
});

/**
 * DELETE /api/admin/projects/:id
 */
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) throw new ApiError(404, 'Projet introuvable');

  await project.destroy();

  res.status(200).json({
    success: true,
    message: 'Projet supprimé',
  });
});

// ==========================================
// PUBLIC — Lecture seule
// ==========================================

/**
 * GET /api/public/projects
 */
const listPublicProjects = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { category } = req.query;

  const where = { isPublished: true };
  if (category) where.category = category;

  const { count, rows } = await Project.findAndCountAll({
    where,
    limit,
    offset,
    order: [['publishedAt', 'DESC']],
    attributes: ['id', 'slug', 'title', 'excerpt', 'category', 'country', 'status', 'publishedAt'],
    include: [
      {
        model: Media,
        as: 'coverImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
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

/**
 * GET /api/public/projects/:slug
 */
const getPublicProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    where: { slug: req.params.slug, isPublished: true },
    include: [
      {
        model: Media,
        as: 'coverImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
      },
    ],
  });

  if (!project) throw new ApiError(404, 'Projet introuvable');

  res.status(200).json({
    success: true,
    data: { project },
  });
});

module.exports = {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  listPublicProjects,
  getPublicProject,
};