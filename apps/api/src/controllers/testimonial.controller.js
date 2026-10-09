const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op } = require('sequelize');
const { sendMail, templateNotification } = require('../services/mail.service');

const { Testimonial, Media } = db;

// ==========================================
// PUBLIC
// ==========================================

/**
 * POST /api/public/testimonials
 * Soumission d'un témoignage → status "pending" par défaut
 */
const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create({
    ...req.body,
    status: 'pending', // Toujours pending pour les soumissions publiques
  });

  // Notifier l'admin par email
  sendMail({
    subject: `[SFPA] Nouveau témoignage en attente — ${testimonial.authorName}`,
    replyTo: testimonial.authorEmail || undefined,
    html: templateNotification({
      title: '💬 Nouveau témoignage à valider',
      fields: {
        'Auteur': testimonial.authorName,
        'Rôle': testimonial.authorRole,
        'Lieu': testimonial.authorLocation,
        'Email': testimonial.authorEmail,
        'Témoignage': testimonial.quote,
        'Note': testimonial.rating ? `${testimonial.rating}/5` : null,
      },
    }),
  }).catch((e) => console.error('Mail error:', e));

  res.status(201).json({
    success: true,
    message:
      "Merci pour votre témoignage ! Il sera publié après validation par notre équipe.",
    data: { id: testimonial.id },
  });
});

/**
 * GET /api/public/testimonials
 * Liste des témoignages APPROUVÉS uniquement
 */
const listPublicTestimonials = asyncHandler(async (req, res) => {
  const { featured } = req.query;

  const where = { status: 'approved' };
  if (featured === 'true') where.isFeatured = true;

  const testimonials = await Testimonial.findAll({
    where,
    order: [['displayOrder', 'ASC'], ['publishedAt', 'DESC']],
    attributes: [
      'id', 'authorName', 'authorRole', 'authorLocation',
      'quote', 'rating', 'isFeatured', 'publishedAt',
    ],
    include: [
      {
        model: Media,
        as: 'authorImage',
        attributes: ['id', 'url', 'thumbnailUrl', 'alt'],
      },
    ],
  });

  res.status(200).json({ success: true, data: { items: testimonials } });
});

// ==========================================
// ADMIN
// ==========================================

/**
 * GET /api/admin/testimonials
 */
const listTestimonials = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { status, search } = req.query;

  const where = {};
  if (status) where.status = status;
  if (search) {
    where[Op.or] = [
      { authorName: { [Op.iLike]: `%${search}%` } },
      { quote: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Testimonial.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      { model: Media, as: 'authorImage', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
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
 * GET /api/admin/testimonials/:id
 */
const getTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByPk(req.params.id, {
    include: [
      { model: Media, as: 'authorImage', attributes: ['id', 'url', 'thumbnailUrl', 'alt'] },
    ],
  });
  if (!testimonial) throw new ApiError(404, 'Témoignage introuvable');

  res.status(200).json({ success: true, data: { testimonial } });
});

/**
 * POST /api/admin/testimonials
 * L'admin peut créer un témoignage directement approuvé
 */
const adminCreateTestimonial = asyncHandler(async (req, res) => {
  const data = req.body;
  const status = data.status || 'approved';
  const publishedAt = status === 'approved' ? new Date() : null;

  const testimonial = await Testimonial.create({
    ...data,
    status,
    publishedAt,
  });

  res.status(201).json({
    success: true,
    message: 'Témoignage créé',
    data: { testimonial },
  });
});

/**
 * PUT /api/admin/testimonials/:id
 * Utilisé pour approuver / rejeter / modifier
 */
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByPk(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Témoignage introuvable');

  const data = req.body;

  // Gestion automatique de publishedAt selon le statut
  if (data.status && data.status !== testimonial.status) {
    if (data.status === 'approved' && !testimonial.publishedAt) {
      data.publishedAt = new Date();
    } else if (data.status === 'pending' || data.status === 'rejected') {
      data.publishedAt = null;
    }
  }

  await testimonial.update(data);

  res.status(200).json({
    success: true,
    message: `Témoignage ${data.status === 'approved' ? 'approuvé' : data.status === 'rejected' ? 'rejeté' : 'mis à jour'}`,
    data: { testimonial },
  });
});

/**
 * DELETE /api/admin/testimonials/:id
 */
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByPk(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Témoignage introuvable');

  await testimonial.destroy();
  res.status(200).json({ success: true, message: 'Témoignage supprimé' });
});

module.exports = {
  createTestimonial,
  listPublicTestimonials,
  listTestimonials,
  getTestimonial,
  adminCreateTestimonial,
  updateTestimonial,
  deleteTestimonial,
};