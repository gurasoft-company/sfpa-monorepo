const Joi = require('joi');

const createContactSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    subject: Joi.string().max(255).allow('', null).optional(),
    message: Joi.string().min(10).required(),
  }),
};

const updateContactSchema = {
  body: Joi.object({
    isRead: Joi.boolean().optional(),
    adminNotes: Joi.string().allow('', null).optional(),
  }),
};

module.exports = { createContactSchema, updateContactSchema };