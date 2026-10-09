const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const { Op } = require('sequelize');

const { Volunteer } = db;
const { sendMail, templateNotification } = require('../services/mail.service');

const createVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.create(req.body);

  sendMail({
    subject: `[SFPA] Nouvelle candidature bénévole — ${volunteer.firstName} ${volunteer.lastName}`,
    replyTo: volunteer.email,
    html: templateNotification({
      title: '🤝 Nouvelle candidature bénévole',
      fields: {
        'Nom': `${volunteer.firstName} ${volunteer.lastName}`,
        'Email': volunteer.email,
        'Téléphone': volunteer.phone,
        'Ville': volunteer.city,
        'Pays': volunteer.country,
        'Compétences': volunteer.skills,
        'Disponibilité': volunteer.availability,
        'Message': volunteer.message,
      },
    }),
  }).catch((e) => console.error('Mail error:', e));

  res.status(201).json({
    success: true,
    message: 'Merci pour votre candidature ! Nous vous recontacterons prochainement.',
    data: { id: volunteer.id },
  });
});


const listVolunteers = asyncHandler(async (req, res) => {
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

  const { count, rows } = await Volunteer.findAndCountAll({
    where, limit, offset,
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: { items: rows, pagination: getPaginationMeta(count, page, limit) },
  });
});

const getVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findByPk(req.params.id);
  if (!volunteer) throw new ApiError(404, 'Bénévole introuvable');
  res.status(200).json({ success: true, data: { volunteer } });
});

const updateVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findByPk(req.params.id);
  if (!volunteer) throw new ApiError(404, 'Bénévole introuvable');
  await volunteer.update(req.body);
  res.status(200).json({ success: true, message: 'Bénévole mis à jour', data: { volunteer } });
});

const deleteVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findByPk(req.params.id);
  if (!volunteer) throw new ApiError(404, 'Bénévole introuvable');
  await volunteer.destroy();
  res.status(200).json({ success: true, message: 'Bénévole supprimé' });
});

module.exports = { createVolunteer, listVolunteers, getVolunteer, updateVolunteer, deleteVolunteer };