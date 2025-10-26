const express = require('express');
const router = express.Router();

const {} = require('../controllers/auth/authController');

// POST Routes
router.post('/register');
router.post('/login');

module.exports = router;