const express = require('express');

// Controllers
const donationController = require('../controllers/donation.controller');
const { recordDonationSchema } = require('../validators/donation.validator');
const projectController = require('../controllers/project.controller');
const postController = require('../controllers/post.controller');
const pageController = require('../controllers/page.controller');
const partnerController = require('../controllers/partner.controller');
const formationController = require('../controllers/formation.controller');
const memberController = require('../controllers/member.controller');
const volunteerController = require('../controllers/volunteer.controller');
const contactController = require('../controllers/contact.controller');
const testimonialController = require('../controllers/testimonial.controller');
const { createTestimonialSchema } = require('../validators/testimonial.validator');

// Middlewares
const { validate } = require('../middlewares/validate.middleware');
const { formLimiter } = require('../middlewares/rateLimit.middleware');

// Validators
const { createMemberSchema } = require('../validators/member.validator');
const { createVolunteerSchema } = require('../validators/volunteer.validator');
const { createContactSchema } = require('../validators/contact.validator');

const router = express.Router();

// ==========================================
// LECTURE (contenu)
// ==========================================
router.get('/projects', projectController.listPublicProjects);
router.get('/projects/:slug', projectController.getPublicProject);
router.get('/posts', postController.listPublicPosts);
router.get('/posts/:slug', postController.getPublicPost);
router.get('/pages/:slug', pageController.getPublicPage);
router.get('/partners', partnerController.listPublicPartners);
router.get('/formations', formationController.listPublicFormations);
router.get('/formations/:slug', formationController.getPublicFormation);

// Formulaires (écriture) — avec rate limiting
router.post('/members', formLimiter, validate(createMemberSchema), memberController.createMember);
router.post('/volunteers', formLimiter, validate(createVolunteerSchema), volunteerController.createVolunteer);
router.post('/contact', formLimiter, validate(createContactSchema), contactController.createContact);
// Témoignages — lecture (approuvés uniquement)
router.get('/testimonials', testimonialController.listPublicTestimonials);

// Témoignages — soumission (validation admin obligatoire)
router.post(
  '/testimonials',
  formLimiter,
  validate(createTestimonialSchema),
  testimonialController.createTestimonial
);

module.exports = router;