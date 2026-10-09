const Joi = require('joi');

const createPostSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(255).required(),
    excerpt: Joi.string().allow('', null).optional(),
    content: Joi.string().allow('', null).optional(),
    coverImageId: Joi.string().uuid().allow(null).optional(),
    category: Joi.string().max(100).allow('', null).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isPublished: Joi.boolean().default(false),
  }),
};

const updatePostSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    excerpt: Joi.string().allow('', null).optional(),
    content: Joi.string().allow('', null).optional(),
    coverImageId: Joi.string().uuid().allow(null).optional(),
    category: Joi.string().max(100).allow('', null).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isPublished: Joi.boolean().optional(),
  }),
};

module.exports = {
  createPostSchema,
  updatePostSchema,
};