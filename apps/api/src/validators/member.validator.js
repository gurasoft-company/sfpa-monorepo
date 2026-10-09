const Joi = require('joi');

const createMemberSchema = {
  body: Joi.object({
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string().max(50).allow('', null).optional(),
    address: Joi.string().allow('', null).optional(),
    city: Joi.string().max(100).allow('', null).optional(),
    country: Joi.string().max(100).allow('', null).optional(),
    membershipType: Joi.string().valid('actif', 'bienfaiteur', 'honneur').default('actif'),
    motivation: Joi.string().allow('', null).optional(),
  }),
};

const updateMemberSchema = {
  body: Joi.object({
    status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
    adminNotes: Joi.string().allow('', null).optional(),
    membershipType: Joi.string().valid('actif', 'bienfaiteur', 'honneur').optional(),
  }),
};

module.exports = { createMemberSchema, updateMemberSchema };