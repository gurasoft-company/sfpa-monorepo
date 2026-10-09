const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { generateUniqueSlug } = require('../services/slug.service');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op } = require('sequelize');

const { Post, Media, User } = db;

// ==========================================
// ADMIN
// ==========================================

const createPost = asyncHandler(async (req, res) => {
  const data = req.body;
  const slug = await generateUniqueSlug(Post, data.title);
  const publishedAt = data.isPublished ? new Date() : null;

  const post = await Post.create({
    ...data,
    slug,
    publishedAt,
    authorId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: 'Article créé avec succès',
    data: { post },
  });
});

const listPosts = asyncHandler(async (req, res) => {
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

  const { count, rows } = await Post.findAndCountAll({
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
      {
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName', 'email'],
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

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: Media,
        as: 'coverImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
      },
      {
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
    ],
  });

  if (!post) throw new ApiError(404, 'Article introuvable');

  res.status(200).json({
    success: true,
    data: { post },
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) throw new ApiError(404, 'Article introuvable');

  const data = req.body;

  if (data.title && data.title !== post.title) {
    data.slug = await generateUniqueSlug(Post, data.title, post.id);
  }

  if (data.isPublished !== undefined) {
    if (data.isPublished && !post.isPublished) {
      data.publishedAt = new Date();
    } else if (!data.isPublished && post.isPublished) {
      data.publishedAt = null;
    }
  }

  await post.update(data);

  res.status(200).json({
    success: true,
    message: 'Article mis à jour',
    data: { post },
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) throw new ApiError(404, 'Article introuvable');

  await post.destroy();

  res.status(200).json({
    success: true,
    message: 'Article supprimé',
  });
});

// ==========================================
// PUBLIC
// ==========================================

const listPublicPosts = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { category } = req.query;

  const where = { isPublished: true };
  if (category) where.category = category;

  const { count, rows } = await Post.findAndCountAll({
    where,
    limit,
    offset,
    order: [['publishedAt', 'DESC']],
    attributes: ['id', 'slug', 'title', 'excerpt', 'category', 'tags', 'publishedAt'],
    include: [
      {
        model: Media,
        as: 'coverImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
      },
      {
        model: User,
        as: 'author',
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

const getPublicPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    where: { slug: req.params.slug, isPublished: true },
    include: [
      {
        model: Media,
        as: 'coverImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
      },
      {
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
  });

  if (!post) throw new ApiError(404, 'Article introuvable');

  res.status(200).json({
    success: true,
    data: { post },
  });
});

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost,
  listPublicPosts,
  getPublicPost,
};