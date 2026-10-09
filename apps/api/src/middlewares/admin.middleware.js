/**
 * Middleware de restriction : vérifie que l'utilisateur a un des rôles autorisés
 * À utiliser APRÈS le middleware protect
 */
function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Permissions insuffisantes.',
      });
    }

    next();
  };
}

module.exports = { restrictTo };