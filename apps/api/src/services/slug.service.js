const slugify = require('slugify');

/**
 * Génère un slug à partir d'une chaîne
 */
function generateSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'fr',
    trim: true,
  });
}

/**
 * Génère un slug unique en base (ajoute -2, -3... si déjà pris)
 * @param {Object} Model - Le modèle Sequelize
 * @param {string} text - Le texte à transformer
 * @param {string} [excludeId] - ID à exclure (utile pour update)
 */
async function generateUniqueSlug(Model, text, excludeId = null) {
  const baseSlug = generateSlug(text);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const where = { slug };
    if (excludeId) where.id = { [require('sequelize').Op.ne]: excludeId };

    const existing = await Model.findOne({ where });
    if (!existing) return slug;

    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
}

module.exports = {
  generateSlug,
  generateUniqueSlug,
};