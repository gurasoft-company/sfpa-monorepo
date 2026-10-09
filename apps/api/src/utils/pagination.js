/**
 * Extrait et normalise les paramètres de pagination d'une requête
 * @param {Object} query - req.query
 * @returns {{page: number, limit: number, offset: number}}
 */
function getPagination(query) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Génère les métadonnées de pagination pour la réponse
 * @param {number} total - Nombre total d'éléments
 * @param {number} page - Page courante
 * @param {number} limit - Limite par page
 */
function getPaginationMeta(total, page, limit) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
}

module.exports = {
  getPagination,
  getPaginationMeta,
};