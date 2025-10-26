const express = require('express');
const router = express.Router();

// import controller function
const {getUserById, getAllUsers, createNewUser, deleteUser } = require('../controllers/users/userController');

//get routes
router.get('/all', getAllUsers);
router.get('/:id', getUserById);

//POST routes
router.post('/', createNewUser);

// DELETE routes

router.delete('/:id', deleteUser);



module.exports = router;