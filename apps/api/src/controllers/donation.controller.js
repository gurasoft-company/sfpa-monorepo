const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op, fn, col, literal } = require('sequelize');

const { Donation } = db;

// ==========================================
// WEBHOOK INTERNE (appelé par le frontend Next.js)
// ==========================================

/**
 * POST /api/public/donations/webhook
 * Le frontend Next.js envoie le don confirmé par Stripe.
 * Sécurisé par un header X-Webhook-Secret partagé.
 */
const recordDonation = asyncHandler(async (req, res) => {
  // Vérifier le secret partagé
  const secret = req.headers['x-webhook-secret'];
  if (secret !== process.env.DONATION_WEBHOOK_SECRET) {
    throw new ApiError(401, 'Webhook secret invalide');
  }

  const {
    stripeSessionId,
    stripePaymentIntentId,
    stripeSubscriptionId,
    stripeCustomerId,
    amount,
    currency = 'EUR',
    frequency = 'once',
    donorEmail,
    donorName,
    donorAddress,
    donorCity,
    donorPostalCode,
    donorCountry,
    status = 'paid',
    paidAt,
    metadata = {},
  } = req.body;

  if (!stripeSessionId) {
    throw new ApiError(400, 'stripeSessionId est obligatoire');
  }
  if (!amount || amount < 100) {
    throw new ApiError(400, 'Montant invalide (minimum 1 €)');
  }

  // Idempotence : si le don existe déjà, on ne le crée pas deux fois
  const existing = await Donation.findOne({ where: { stripeSessionId } });
  if (existing) {
    return res.status(200).json({
      success: true,
      message: 'Don déjà enregistré (idempotent)',
      data: { donation: existing },
    });
  }

  const donation = await Donation.create({
    stripeSessionId,
    stripePaymentIntentId,
    stripeSubscriptionId,
    stripeCustomerId,
    amount,
    currency,
    frequency,
    donorEmail,
    donorName,
    donorAddress,
    donorCity,
    donorPostalCode,
    donorCountry,
    status,
    paidAt: paidAt ? new Date(paidAt) : new Date(),
    metadata,
  });

  console.log('💰 Don enregistré :', {
    id: donation.id,
    amount: `${(donation.amount / 100).toFixed(2)} ${donation.currency}`,
    frequency: donation.frequency,
    email: donation.donorEmail,
  });

  res.status(201).json({
    success: true,
    message: 'Don enregistré avec succès',
    data: { donation },
  });
});

// ==========================================
// ADMIN
// ==========================================

/**
 * GET /api/admin/donations
 */
const listDonations = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { status, frequency, search, from, to } = req.query;

  const where = {};
  if (status) where.status = status;
  if (frequency) where.frequency = frequency;
  if (search) {
    where[Op.or] = [
      { donorEmail: { [Op.iLike]: `%${search}%` } },
      { donorName: { [Op.iLike]: `%${search}%` } },
      { stripeSessionId: { [Op.iLike]: `%${search}%` } },
    ];
  }
  if (from || to) {
    where.paidAt = {};
    if (from) where.paidAt[Op.gte] = new Date(from);
    if (to) where.paidAt[Op.lte] = new Date(to);
  }

  const { count, rows } = await Donation.findAndCountAll({
    where,
    limit,
    offset,
    order: [['paidAt', 'DESC NULLS LAST'], ['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: {
      items: rows,
      pagination: getPaginationMeta(count, page, limit),
    },
  });
});

/**
 * GET /api/admin/donations/stats
 */
const getDonationStats = asyncHandler(async (req, res) => {
  // Total global (uniquement dons payés)
  const globalStats = await Donation.findOne({
    where: { status: 'paid' },
    attributes: [
      [fn('COUNT', col('id')), 'count'],
      [fn('SUM', col('amount')), 'totalAmount'],
      [fn('AVG', col('amount')), 'averageAmount'],
    ],
    raw: true,
  });

  // Nombre de dons mensuels actifs
  const monthlyActive = await Donation.count({
    where: { status: 'paid', frequency: 'monthly' },
  });

  // Dons du mois en cours
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const monthStats = await Donation.findOne({
    where: {
      status: 'paid',
      paidAt: { [Op.gte]: startOfMonth },
    },
    attributes: [
      [fn('COUNT', col('id')), 'count'],
      [fn('SUM', col('amount')), 'totalAmount'],
    ],
    raw: true,
  });

  // Dons de l'année en cours
  const startOfYear = new Date();
  startOfYear.setMonth(0, 1);
  startOfYear.setHours(0, 0, 0, 0);

  const yearStats = await Donation.findOne({
    where: {
      status: 'paid',
      paidAt: { [Op.gte]: startOfYear },
    },
    attributes: [
      [fn('COUNT', col('id')), 'count'],
      [fn('SUM', col('amount')), 'totalAmount'],
    ],
    raw: true,
  });

  // Derniers dons (5)
  const recentDonations = await Donation.findAll({
    where: { status: 'paid' },
    limit: 5,
    order: [['paidAt', 'DESC']],
    attributes: ['id', 'donorName', 'donorEmail', 'amount', 'currency', 'frequency', 'paidAt'],
  });

  res.status(200).json({
    success: true,
    data: {
      global: {
        count: parseInt(globalStats.count, 10) || 0,
        totalAmount: parseInt(globalStats.totalAmount, 10) || 0,
        averageAmount: parseFloat(globalStats.averageAmount) || 0,
      },
      monthlyActive,
      currentMonth: {
        count: parseInt(monthStats.count, 10) || 0,
        totalAmount: parseInt(monthStats.totalAmount, 10) || 0,
      },
      currentYear: {
        count: parseInt(yearStats.count, 10) || 0,
        totalAmount: parseInt(yearStats.totalAmount, 10) || 0,
      },
      recentDonations,
    },
  });
});

/**
 * GET /api/admin/donations/:id
 */
const getDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findByPk(req.params.id);
  if (!donation) throw new ApiError(404, 'Don introuvable');
  res.status(200).json({ success: true, data: { donation } });
});

/**
 * PUT /api/admin/donations/:id
 */
const updateDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findByPk(req.params.id);
  if (!donation) throw new ApiError(404, 'Don introuvable');

  const allowedFields = [
    'status',
    'adminNotes',
    'taxReceiptSent',
    'taxReceiptSentAt',
    'taxReceiptRequested',
    'donorName',
    'donorEmail',
    'donorAddress',
    'donorCity',
    'donorPostalCode',
    'donorCountry',
  ];

  const data = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) data[key] = req.body[key];
  }

  // Si on marque le reçu fiscal comme envoyé → enregistrer la date
  if (data.taxReceiptSent === true && !donation.taxReceiptSentAt) {
    data.taxReceiptSentAt = new Date();
  }

  await donation.update(data);

  res.status(200).json({
    success: true,
    message: 'Don mis à jour',
    data: { donation },
  });
});

/**
 * DELETE /api/admin/donations/:id
 */
const deleteDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findByPk(req.params.id);
  if (!donation) throw new ApiError(404, 'Don introuvable');
  await donation.destroy();
  res.status(200).json({ success: true, message: 'Don supprimé' });
});

module.exports = {
  recordDonation,
  listDonations,
  getDonationStats,
  getDonation,
  updateDonation,
  deleteDonation,
};