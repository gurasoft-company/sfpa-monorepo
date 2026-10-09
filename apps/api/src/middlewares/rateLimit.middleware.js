const rateLimit = require('express-rate-limit');

// 5 soumissions par heure par IP (formulaires publics)
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Trop de soumissions. Merci de réessayer dans une heure.',
  },
});

module.exports = { formLimiter };