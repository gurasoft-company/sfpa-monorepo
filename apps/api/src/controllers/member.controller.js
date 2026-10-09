const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { getPagination, getPaginationMeta } = require('../utils/pagination');

const { Op } = require('sequelize');

const { Member } = db;

// PUBLIC — Création (formulaire)
const { sendMail, templateNotification } = require('../services/mail.service');

const createMember = asyncHandler(async (req, res) => {
  const member = await Member.create(req.body);

  // Notification email (non bloquante)
  sendMail({
    subject: `[SFPA] Nouvelle adhésion — ${member.firstName} ${member.lastName}`,
    replyTo: member.email,
    html: templateNotification({
      title: '📋 Nouvelle demande d\'adhésion',
      fields: {
        'Nom': `${member.firstName} ${member.lastName}`,
        'Email': member.email,
        'Téléphone': member.phone,
        'Ville': member.city,
        'Pays': member.country,
        'Type': member.membershipType,
        'Motivation': member.motivation,
      },
    }),
  }).catch((e) => console.error('Mail error:', e));

  res.status(201).json({
    success: true,
    message: 'Votre demande d\'adhésion a bien été envoyée. Nous vous recontacterons rapidement.',
    data: { id: member.id },
  });
});

// ADMIN — Liste
const listMembers = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { status, search } = req.query;

  const where = {};
  if (status) where.status = status;
  if (search) {
    where[Op.or] = [
      { firstName: { [Op.iLike]: `%${search}%` } },
      { lastName: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Member.findAndCountAll({
    where, limit, offset,
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: { items: rows, pagination: getPaginationMeta(count, page, limit) },
  });
});

// ADMIN — Détail
const getMember = asyncHandler(async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if (!member) throw new ApiError(404, 'Adhérent introuvable');
  res.status(200).json({ success: true, data: { member } });
});

// ADMIN — Update (statut, notes)
const updateMember = asyncHandler(async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if (!member) throw new ApiError(404, 'Adhérent introuvable');
  await member.update(req.body);
  res.status(200).json({ success: true, message: 'Adhérent mis à jour', data: { member } });
});

// ADMIN — Delete
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if (!member) throw new ApiError(404, 'Adhérent introuvable');
  await member.destroy();
  res.status(200).json({ success: true, message: 'Adhérent supprimé' });
});

module.exports = { createMember, listMembers, getMember, updateMember, deleteMember };