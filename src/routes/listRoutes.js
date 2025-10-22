const express = require('express');
const router = express.Router();

// import controllers
const { getListById, getAllLists, createNewList } = require('../controllers/lists/listController');

// GET Routes
router.get('/:id', getListById);
router.get('/', getAllLists);

// POST Routes
router.post('/', createNewList);


module.exports = router;