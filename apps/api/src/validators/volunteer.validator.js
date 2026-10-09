const Joi = require('joi');

const createVolunteerSchema = {
  body: Joi.object({
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string().max(50).allow('', null).optional(),
    city: Joi.string().max(100).allow('', null).optional(),
    country: Joi.string().max(100).allow('', null).optional(),
    skills: Joi.string().allow('', null).optional(),
    availability: Joi.string().max(255).allow('', null).optional(),
    message: Joi.string().allow('', null).optional(),
  }),
};

const updateVolunteerSchema = {
  body: Joi.object({
    status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
    adminNotes: Joi.string().allow('', null).optional(),
  }),
};

module.exports = { createVolunteerSchema, updateVolunteerSchema };