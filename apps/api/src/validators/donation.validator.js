const Joi = require('joi');

const recordDonationSchema = {
  body: Joi.object({
    stripeSessionId: Joi.string().max(255).required(),
    stripePaymentIntentId: Joi.string().max(255).allow(null, '').optional(),
    stripeSubscriptionId: Joi.string().max(255).allow(null, '').optional(),
    stripeCustomerId: Joi.string().max(255).allow(null, '').optional(),
    amount: Joi.number().integer().min(100).required(),
    currency: Joi.string().length(3).default('EUR'),
    frequency: Joi.string().valid('once', 'monthly').default('once'),
    donorEmail: Joi.string().email({ tlds: { allow: false } }).allow(null, '').optional(),
    donorName: Joi.string().max(255).allow(null, '').optional(),
    donorAddress: Joi.string().allow(null, '').optional(),
    donorCity: Joi.string().max(100).allow(null, '').optional(),
    donorPostalCode: Joi.string().max(20).allow(null, '').optional(),
    donorCountry: Joi.string().max(100).allow(null, '').optional(),
    status: Joi.string().valid('pending', 'paid', 'failed', 'refunded', 'cancelled').default('paid'),
    paidAt: Joi.date().allow(null).optional(),
    metadata: Joi.object().optional(),
  }),
};

const updateDonationSchema = {
  body: Joi.object({
    status: Joi.string().valid('pending', 'paid', 'failed', 'refunded', 'cancelled').optional(),
    adminNotes: Joi.string().allow('', null).optional(),
    taxReceiptSent: Joi.boolean().optional(),
    taxReceiptRequested: Joi.boolean().optional(),
    donorName: Joi.string().max(255).allow('', null).optional(),
    donorEmail: Joi.string().email({ tlds: { allow: false } }).allow('', null).optional(),
    donorAddress: Joi.string().allow('', null).optional(),
    donorCity: Joi.string().max(100).allow('', null).optional(),
    donorPostalCode: Joi.string().max(20).allow('', null).optional(),
    donorCountry: Joi.string().max(100).allow('', null).optional(),
  }),
};

module.exports = { recordDonationSchema, updateDonationSchema };