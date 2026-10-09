/**
 * Classe d'erreur personnalisée avec code HTTP
 * Utilisation : throw new ApiError(404, 'Ressource introuvable');
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;