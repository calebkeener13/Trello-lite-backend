const express = require('express');
const router = express.Router();

// import the controllers
const { getCardById, getAllCards, createNewCard, deleteCard } = require('../controllers/cards/cardController');

// GET Routes
router.get('/:id', getCardById);
router.get('/', getAllCards);

// POST Routes
router.post('/', createNewCard);

// DELETE Routes
router.delete('/:id', deleteCard);

module.exports = router