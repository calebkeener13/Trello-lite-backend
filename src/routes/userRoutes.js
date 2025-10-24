const express = require('express');
const router = express.Router();

// import controller function
const {getUserById, getAllUsers, createNewUser, deleteUser } = require('../controllers/users/userController');

//get routes
router.get('/:id', getUserById);
router.get('/all', getAllUsers);

//POST routes
router.post('/', createNewUser);

// DELETE routes

router.delete('/:id', deleteUser);



module.exports = router;