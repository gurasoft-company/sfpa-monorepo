const ApiError = require('../utils/ApiError');

/**
 * Middleware de validation générique via Joi
 * @param {Object} schema - Schéma Joi { body?, query?, params? }
 */
function validate(schema) {
  return (req, res, next) => {
    const errors = [];

    ['body', 'query', 'params'].forEach((key) => {
      if (!schema[key]) return;

      const { error, value } = schema[key].validate(req[key], {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });

      if (error) {
        const messages = error.details.map((d) => d.message);
        errors.push(...messages);
      } else {
        req[key] = value; // remplace par la version validée/nettoyée
      }
    });

    if (errors.length > 0) {
      return next(new ApiError(400, errors.join(' | ')));
    }

    next();
  };
}

module.exports = { validate };