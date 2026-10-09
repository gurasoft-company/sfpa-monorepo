const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { restrictTo } = require('../middlewares/admin.middleware');
const { validate } = require('../middlewares/validate.middleware');
const {
  loginSchema,
  registerSchema,
  updateProfileSchema,
  changePasswordSchema,
} = require('../validators/auth.validator');

const router = express.Router();

// ==========================================
// Routes publiques
// ==========================================
router.post('/login', validate(loginSchema), authController.login);

// ==========================================
// Routes protégées (JWT requis)
// ==========================================
router.use(protect);

router.post('/logout', authController.logout);
router.get('/me', authController.me);

// Profil
router.put('/profile', validate(updateProfileSchema), authController.updateProfile);

// Mot de passe
router.put('/change-password', validate(changePasswordSchema), authController.changePassword);

// ==========================================
// Réservé aux admins
// ==========================================
router.post(
  '/register',
  restrictTo('admin'),
  validate(registerSchema),
  authController.register
);

module.exports = router;