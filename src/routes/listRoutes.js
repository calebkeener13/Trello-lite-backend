const express = require('express');
const router = express.Router();

// import controllers
const { getListById, getAllLists, createNewList, deleteList } = require('../controllers/lists/listController');

// GET Routes
router.get('/:id', getListById);
router.get('/', getAllLists);

// POST Routes
router.post('/', createNewList);

// DELETE Routes
router.delete('/:id', deleteList);


module.exports = router;