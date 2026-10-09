const Joi = require('joi');

const loginSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Email invalide',
        'any.required': "L'email est obligatoire",
      }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'any.required': 'Le mot de passe est obligatoire',
    }),
  }),
};

const registerSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).max(255).required(),
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    role: Joi.string().valid('admin', 'editor').default('editor'),
    isActive: Joi.boolean().default(true),
  }),
};

// ⬇️ NOUVEAU : mise à jour du profil
const updateProfileSchema = {
  body: Joi.object({
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .max(255)
      .required(),
  }),
};

// ⬇️ NOUVEAU : changement de mot de passe
const changePasswordSchema = {
  body: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Le mot de passe actuel est obligatoire',
    }),
    newPassword: Joi.string()
      .min(8)
      .max(255)
      .pattern(/[A-Z]/, 'une majuscule')
      .pattern(/[a-z]/, 'une minuscule')
      .pattern(/\d/, 'un chiffre')
      .required()
      .messages({
        'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères',
        'string.pattern.name': 'Le nouveau mot de passe doit contenir {#name}',
        'any.required': 'Le nouveau mot de passe est obligatoire',
      }),
  }),
};

module.exports = {
  loginSchema,
  registerSchema,
  updateProfileSchema,
  changePasswordSchema,
};