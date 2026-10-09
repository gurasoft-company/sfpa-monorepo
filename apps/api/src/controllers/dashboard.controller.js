const asyncHandler = require('../utils/asyncHandler');
const db = require('../models');

const { Project, Post, Page, Partner, Formation, Member, Volunteer, Contact, Media } = db;

const getStats = asyncHandler(async (req, res) => {
  const [
    projectsTotal, projectsPublished,
    postsTotal, postsPublished,
    pagesTotal,
    partnersTotal, partnersPublished,
    formationsTotal,
    membersTotal, membersPending,
    volunteersTotal, volunteersPending,
    contactsTotal, contactsUnread,
    mediaTotal,
  ] = await Promise.all([
    Project.count(),
    Project.count({ where: { isPublished: true } }),
    Post.count(),
    Post.count({ where: { isPublished: true } }),
    Page.count(),
    Partner.count(),
    Partner.count({ where: { isPublished: true } }),
    Formation.count(),
    Member.count(),
    Member.count({ where: { status: 'pending' } }),
    Volunteer.count(),
    Volunteer.count({ where: { status: 'pending' } }),
    Contact.count(),
    Contact.count({ where: { isRead: false } }),
    Media.count(),
  ]);

  // 5 dernières soumissions
  const [recentMembers, recentVolunteers, recentContacts] = await Promise.all([
    Member.findAll({ limit: 5, order: [['createdAt', 'DESC']], attributes: ['id', 'firstName', 'lastName', 'email', 'status', 'createdAt'] }),
    Volunteer.findAll({ limit: 5, order: [['createdAt', 'DESC']], attributes: ['id', 'firstName', 'lastName', 'email', 'status', 'createdAt'] }),
    Contact.findAll({ limit: 5, order: [['createdAt', 'DESC']], attributes: ['id', 'name', 'email', 'subject', 'isRead', 'createdAt'] }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      content: {
        projects: { total: projectsTotal, published: projectsPublished },
        posts: { total: postsTotal, published: postsPublished },
        pages: { total: pagesTotal },
        partners: { total: partnersTotal, published: partnersPublished },
        formations: { total: formationsTotal },
        media: { total: mediaTotal },
      },
      forms: {
        members: { total: membersTotal, pending: membersPending },
        volunteers: { total: volunteersTotal, pending: volunteersPending },
        contacts: { total: contactsTotal, unread: contactsUnread },
      },
      recent: {
        members: recentMembers,
        volunteers: recentVolunteers,
        contacts: recentContacts,
      },
    },
  });
});

module.exports = { getStats };