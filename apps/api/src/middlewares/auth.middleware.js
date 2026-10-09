const { verifyToken } = require('../services/auth.service');
const db = require('../models');

const { User } = db;

/**
 * Middleware d'authentification : vérifie le JWT et injecte req.user
 */
async function protect(req, res, next) {
  try {
    let token;

    // 1. Chercher le token dans le header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Sinon, chercher dans les cookies (utile pour le SPA admin)
    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Accès refusé. Token manquant.',
      });
    }

    // 3. Vérifier le token
    const decoded = verifyToken(token);

    // 4. Vérifier que l'utilisateur existe toujours et est actif
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur introuvable.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Compte désactivé.',
      });
    }

    // 5. Injecter l'utilisateur dans la requête
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { protect };