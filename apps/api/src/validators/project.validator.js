const Joi = require('joi');

const createProjectSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(255).required(),
    excerpt: Joi.string().allow('', null).optional(),
    description: Joi.string().allow('', null).optional(),
    category: Joi.string()
      .valid('formation', 'agriculture', 'eau', 'energie', 'reforestation', 'autre')
      .default('autre'),
    country: Joi.string().max(100).allow('', null).optional(),
    status: Joi.string().valid('en_cours', 'termine', 'a_venir').default('en_cours'),
    coverImageId: Joi.string().uuid().allow(null).optional(),
    startDate: Joi.date().allow(null).optional(),
    endDate: Joi.date().allow(null).optional(),
    isPublished: Joi.boolean().default(false),
  }),
};

const updateProjectSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    excerpt: Joi.string().allow('', null).optional(),
    description: Joi.string().allow('', null).optional(),
    category: Joi.string()
      .valid('formation', 'agriculture', 'eau', 'energie', 'reforestation', 'autre')
      .optional(),
    country: Joi.string().max(100).allow('', null).optional(),
    status: Joi.string().valid('en_cours', 'termine', 'a_venir').optional(),
    coverImageId: Joi.string().uuid().allow(null).optional(),
    startDate: Joi.date().allow(null).optional(),
    endDate: Joi.date().allow(null).optional(),
    isPublished: Joi.boolean().optional(),
  }),
};

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};