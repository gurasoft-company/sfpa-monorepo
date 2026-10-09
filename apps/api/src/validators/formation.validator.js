const Joi = require('joi');

const CATEGORIES = ['agriculture', 'batiment', 'mecanique', 'artisanat', 'numerique', 'autre'];

const createFormationSchema = {
  body: Joi.object({
    title: Joi.string().min(2).max(255).required(),
    excerpt: Joi.string().allow('', null).optional(),
    description: Joi.string().allow('', null).optional(),
    objectives: Joi.array().items(Joi.string()).default([]),
    duration: Joi.string().max(100).allow('', null).optional(),
    level: Joi.string().max(100).allow('', null).optional(),
    audience: Joi.string().max(255).allow('', null).optional(),
    category: Joi.string().valid(...CATEGORIES).default('autre'),
    coverImageId: Joi.string().uuid().allow(null).optional(),
    displayOrder: Joi.number().integer().min(0).default(0),
    isPublished: Joi.boolean().default(false),
  }),
};

const updateFormationSchema = {
  body: Joi.object({
    title: Joi.string().min(2).max(255).optional(),
    excerpt: Joi.string().allow('', null).optional(),
    description: Joi.string().allow('', null).optional(),
    objectives: Joi.array().items(Joi.string()).optional(),
    duration: Joi.string().max(100).allow('', null).optional(),
    level: Joi.string().max(100).allow('', null).optional(),
    audience: Joi.string().max(255).allow('', null).optional(),
    category: Joi.string().valid(...CATEGORIES).optional(),
    coverImageId: Joi.string().uuid().allow(null).optional(),
    displayOrder: Joi.number().integer().min(0).optional(),
    isPublished: Joi.boolean().optional(),
  }),
};

module.exports = {
  createFormationSchema,
  updateFormationSchema,
};