const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op } = require('sequelize');

const { Contact } = db;

const { sendMail, templateNotification } = require('../services/mail.service');

const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  sendMail({
    subject: `[SFPA] Nouveau message — ${contact.subject || contact.name}`,
    replyTo: contact.email,
    html: templateNotification({
      title: '✉️ Nouveau message de contact',
      fields: {
        'Nom': contact.name,
        'Email': contact.email,
        'Sujet': contact.subject,
        'Message': contact.message,
      },
    }),
  }).catch((e) => console.error('Mail error:', e));

  res.status(201).json({
    success: true,
    message: 'Votre message a bien été envoyé. Nous vous répondrons rapidement.',
    data: { id: contact.id },
  });
});

const listContacts = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { isRead, search } = req.query;

  const where = {};
  if (isRead !== undefined) where.isRead = isRead === 'true';
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
      { subject: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Contact.findAndCountAll({
    where, limit, offset,
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: { items: rows, pagination: getPaginationMeta(count, page, limit) },
  });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) throw new ApiError(404, 'Message introuvable');
  res.status(200).json({ success: true, data: { contact } });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) throw new ApiError(404, 'Message introuvable');
  await contact.update(req.body);
  res.status(200).json({ success: true, message: 'Message mis à jour', data: { contact } });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) throw new ApiError(404, 'Message introuvable');
  await contact.destroy();
  res.status(200).json({ success: true, message: 'Message supprimé' });
});

module.exports = { createContact, listContacts, getContact, updateContact, deleteContact };