const Joi = require('joi');

const createPageSchema = {
  body: Joi.object({
    slug: Joi.string()
      .pattern(/^[a-z0-9-]+$/)
      .min(2)
      .max(255)
      .required()
      .messages({
        'string.pattern.base':
          'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets',
      }),
    title: Joi.string().min(2).max(255).required(),
    content: Joi.object().default({}),
    metaTitle: Joi.string().max(255).allow('', null).optional(),
    metaDescription: Joi.string().allow('', null).optional(),
    isPublished: Joi.boolean().default(false),
  }),
};

const updatePageSchema = {
  body: Joi.object({
    slug: Joi.string()
      .pattern(/^[a-z0-9-]+$/)
      .min(2)
      .max(255)
      .optional(),
    title: Joi.string().min(2).max(255).optional(),
    content: Joi.object().optional(),
    metaTitle: Joi.string().max(255).allow('', null).optional(),
    metaDescription: Joi.string().allow('', null).optional(),
    isPublished: Joi.boolean().optional(),
  }),
};

module.exports = {
  createPageSchema,
  updatePageSchema,
};