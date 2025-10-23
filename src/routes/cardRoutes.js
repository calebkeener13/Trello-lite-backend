const express = require('express');
const router = express.Router();

// import the controllers
const { getCardById, getAllCards, createNewCard } = require('../controllers/cards/cardController');

// GET Routes
router.get('/:id', getCardById);
router.get('/', getAllCards);

// POST Routes
router.post('/', createNewCard);

module.exports = router