const express = require('express');
const router = express.Router();

// import verify token
const verifyToken = require('../middleware/authMiddleware');

// import controllers
const { getListById, getAllLists, createNewList, deleteList } = require('../controllers/lists/listController');

// global middleware for protected route
router.use(verifyToken);

// GET Routes
router.get('/:id', getListById);
router.get('/', getAllLists);

// POST Routes
router.post('/', createNewList);

// DELETE Routes
router.delete('/:id', deleteList);


module.exports = router;