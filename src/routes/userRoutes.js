const express = require('express');
const router = express.Router();

// import verify token
const authenticateJWT = require('../middleware/authMiddleware');

// import controller function
const {getUserById, getAllUsers, createNewUser, deleteUser } = require('../controllers/users/userController');

// global middleware for protected route
router.use(authenticateJWT);

//get routes
router.get('/all', getAllUsers);
router.get('/:id', getUserById);

//POST routes
router.post('/', createNewUser);

// DELETE routes

router.delete('/:id', deleteUser);


module.exports = router;