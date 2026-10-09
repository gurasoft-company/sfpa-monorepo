const Joi = require('joi');

const createPartnerSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    type: Joi.string()
      .valid('ecole', 'entreprise', 'collectivite', 'association', 'autre')
      .default('autre'),
    description: Joi.string().allow('', null).optional(),
    logoId: Joi.string().uuid().allow(null).optional(),
    website: Joi.string().uri().max(500).allow('', null).optional(),
    country: Joi.string().max(100).allow('', null).optional(),
    displayOrder: Joi.number().integer().min(0).default(0),
    isPublished: Joi.boolean().default(false),
  }),
};

const updatePartnerSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(255).optional(),
    type: Joi.string()
      .valid('ecole', 'entreprise', 'collectivite', 'association', 'autre')
      .optional(),
    description: Joi.string().allow('', null).optional(),
    logoId: Joi.string().uuid().allow(null).optional(),
    website: Joi.string().uri().max(500).allow('', null).optional(),
    country: Joi.string().max(100).allow('', null).optional(),
    displayOrder: Joi.number().integer().min(0).optional(),
    isPublished: Joi.boolean().optional(),
  }),
};

module.exports = {
  createPartnerSchema,
  updatePartnerSchema,
};