const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const { restrictTo } = require('../middlewares/admin.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { uploadSingle } = require('../middlewares/upload.middleware');

// Controllers
const donationController = require('../controllers/donation.controller');
const { updateDonationSchema } = require('../validators/donation.validator');
const mediaController = require('../controllers/media.controller');
const projectController = require('../controllers/project.controller');
const postController = require('../controllers/post.controller');
const pageController = require('../controllers/page.controller');
const partnerController = require('../controllers/partner.controller');
const formationController = require('../controllers/formation.controller');
const memberController = require('../controllers/member.controller');
const volunteerController = require('../controllers/volunteer.controller');
const contactController = require('../controllers/contact.controller');
const dashboardController = require('../controllers/dashboard.controller');
// Validators
const { createProjectSchema, updateProjectSchema } = require('../validators/project.validator');
const { createPostSchema, updatePostSchema } = require('../validators/post.validator');
const { createPageSchema, updatePageSchema } = require('../validators/page.validator');
const { createPartnerSchema, updatePartnerSchema } = require('../validators/partner.validator');
const { createFormationSchema, updateFormationSchema } = require('../validators/formation.validator');
const { updateMemberSchema } = require('../validators/member.validator');
const { updateVolunteerSchema } = require('../validators/volunteer.validator');
const { updateContactSchema } = require('../validators/contact.validator');
const testimonialController = require('../controllers/testimonial.controller');
const { adminUpdateTestimonialSchema } = require('../validators/testimonial.validator');


const router = express.Router();

router.use(protect);
// ==========================================
// DASHBOARD
// ==========================================
router.get('/dashboard/stats', restrictTo('admin', 'editor'), dashboardController.getStats);

// ==========================================
// MEDIA
// ==========================================
router.post('/media/upload', restrictTo('admin', 'editor'), uploadSingle, mediaController.uploadMedia);
router.get('/media', restrictTo('admin', 'editor'), mediaController.listMedia);
router.get('/media/:id', restrictTo('admin', 'editor'), mediaController.getMedia);
router.delete('/media/:id', restrictTo('admin'), mediaController.deleteMedia);

// ==========================================
// PROJECTS
// ==========================================
router.post('/projects', restrictTo('admin', 'editor'), validate(createProjectSchema), projectController.createProject);
router.get('/projects', restrictTo('admin', 'editor'), projectController.listProjects);
router.get('/projects/:id', restrictTo('admin', 'editor'), projectController.getProject);
router.put('/projects/:id', restrictTo('admin', 'editor'), validate(updateProjectSchema), projectController.updateProject);
router.delete('/projects/:id', restrictTo('admin'), projectController.deleteProject);

// ==========================================
// POSTS
// ==========================================
router.post('/posts', restrictTo('admin', 'editor'), validate(createPostSchema), postController.createPost);
router.get('/posts', restrictTo('admin', 'editor'), postController.listPosts);
router.get('/posts/:id', restrictTo('admin', 'editor'), postController.getPost);
router.put('/posts/:id', restrictTo('admin', 'editor'), validate(updatePostSchema), postController.updatePost);
router.delete('/posts/:id', restrictTo('admin'), postController.deletePost);

// ==========================================
// PAGES
// ==========================================
router.post('/pages', restrictTo('admin', 'editor'), validate(createPageSchema), pageController.createPage);
router.get('/pages', restrictTo('admin', 'editor'), pageController.listPages);
router.get('/pages/:id', restrictTo('admin', 'editor'), pageController.getPage);
router.put('/pages/:id', restrictTo('admin', 'editor'), validate(updatePageSchema), pageController.updatePage);
router.delete('/pages/:id', restrictTo('admin'), pageController.deletePage);

// ==========================================
// PARTNERS
// ==========================================
router.post('/partners', restrictTo('admin', 'editor'), validate(createPartnerSchema), partnerController.createPartner);
router.get('/partners', restrictTo('admin', 'editor'), partnerController.listPartners);
router.get('/partners/:id', restrictTo('admin', 'editor'), partnerController.getPartner);
router.put('/partners/:id', restrictTo('admin', 'editor'), validate(updatePartnerSchema), partnerController.updatePartner);
router.delete('/partners/:id', restrictTo('admin'), partnerController.deletePartner);

// ==========================================
// FORMATIONS
// ==========================================
router.post('/formations', restrictTo('admin', 'editor'), validate(createFormationSchema), formationController.createFormation);
router.get('/formations', restrictTo('admin', 'editor'), formationController.listFormations);
router.get('/formations/:id', restrictTo('admin', 'editor'), formationController.getFormation);
router.put('/formations/:id', restrictTo('admin', 'editor'), validate(updateFormationSchema), formationController.updateFormation);
router.delete('/formations/:id', restrictTo('admin'), formationController.deleteFormation);

// ==========================================
// MEMBERS
// ==========================================
router.get('/members', restrictTo('admin', 'editor'), memberController.listMembers);
router.get('/members/:id', restrictTo('admin', 'editor'), memberController.getMember);
router.put('/members/:id', restrictTo('admin', 'editor'), validate(updateMemberSchema), memberController.updateMember);
router.delete('/members/:id', restrictTo('admin'), memberController.deleteMember);

// ==========================================
// VOLUNTEERS
// ==========================================
router.get('/volunteers', restrictTo('admin', 'editor'), volunteerController.listVolunteers);
router.get('/volunteers/:id', restrictTo('admin', 'editor'), volunteerController.getVolunteer);
router.put('/volunteers/:id', restrictTo('admin', 'editor'), validate(updateVolunteerSchema), volunteerController.updateVolunteer);
router.delete('/volunteers/:id', restrictTo('admin'), volunteerController.deleteVolunteer);

// ==========================================
// CONTACTS
// ==========================================
router.get('/contacts', restrictTo('admin', 'editor'), contactController.listContacts);
router.get('/contacts/:id', restrictTo('admin', 'editor'), contactController.getContact);
router.put('/contacts/:id', restrictTo('admin', 'editor'), validate(updateContactSchema), contactController.updateContact);
router.delete('/contacts/:id', restrictTo('admin'), contactController.deleteContact);
// ==========================================
// TESTIMONIALS
// ==========================================
router.post(
  '/testimonials',
  restrictTo('admin', 'editor'),
  validate(adminUpdateTestimonialSchema),
  testimonialController.adminCreateTestimonial
);
router.get('/testimonials', restrictTo('admin', 'editor'), testimonialController.listTestimonials);
router.get('/testimonials/:id', restrictTo('admin', 'editor'), testimonialController.getTestimonial);
router.put(
  '/testimonials/:id',
  restrictTo('admin', 'editor'),
  validate(adminUpdateTestimonialSchema),
  testimonialController.updateTestimonial
);
router.delete('/testimonials/:id', restrictTo('admin'), testimonialController.deleteTestimonial);

// ==========================================
// DONATIONS
// ==========================================
router.get('/donations', restrictTo('admin', 'editor'), donationController.listDonations);
router.get('/donations/stats', restrictTo('admin', 'editor'), donationController.getDonationStats);
router.get('/donations/:id', restrictTo('admin', 'editor'), donationController.getDonation);
router.put(
  '/donations/:id',
  restrictTo('admin', 'editor'),
  validate(updateDonationSchema),
  donationController.updateDonation
);
router.delete('/donations/:id', restrictTo('admin'), donationController.deleteDonation);




module.exports = router;