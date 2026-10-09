const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/admin', require('./admin.routes'));
router.use('/public', require('./public.routes'));

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API SFPA opérationnelle',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;