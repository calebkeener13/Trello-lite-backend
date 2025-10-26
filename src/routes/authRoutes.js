const express = require('express');
const router = express.Router();

// import route handlers
const { registerUser, loginUser } = require('../controllers/auth/authController');

// POST Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;