const express = require('express');
const router = express.Router();

// import controller function
const {getCurrentUser, getAllUsers} = require('../controllers/users/userController');

router.get('/', getCurrentUser);
router.get('/all', getAllUsers)



module.exports = router;