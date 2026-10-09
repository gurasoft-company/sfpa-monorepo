const Joi = require('joi');

// Public : soumission d'un témoignage (validation admin obligatoire)
const createTestimonialSchema = {
  body: Joi.object({
    authorName: Joi.string().min(2).max(255).required(),
    authorEmail: Joi.string().email({ tlds: { allow: false } }).allow('', null).optional(),
    authorRole: Joi.string().max(255).allow('', null).optional(),
    authorLocation: Joi.string().max(255).allow('', null).optional(),
    quote: Joi.string().min(20).max(2000).required(),
    rating: Joi.number().integer().min(1).max(5).allow(null).optional(),
  }),
};

// Admin : création ou modification complète
const adminUpdateTestimonialSchema = {
  body: Joi.object({
    authorName: Joi.string().min(2).max(255).optional(),
    authorEmail: Joi.string().email({ tlds: { allow: false } }).allow('', null).optional(),
    authorRole: Joi.string().max(255).allow('', null).optional(),
    authorLocation: Joi.string().max(255).allow('', null).optional(),
    authorImageId: Joi.string().uuid().allow(null).optional(),
    quote: Joi.string().min(20).max(2000).optional(),
    rating: Joi.number().integer().min(1).max(5).allow(null).optional(),
    status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
    isFeatured: Joi.boolean().optional(),
    displayOrder: Joi.number().integer().min(0).optional(),
    adminNotes: Joi.string().allow('', null).optional(),
  }),
};

module.exports = {
  createTestimonialSchema,
  adminUpdateTestimonialSchema,
};