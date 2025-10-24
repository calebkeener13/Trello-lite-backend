const express = require('express')
const router = express.Router()

// import board controller
const { createNewBoard, getBoardById, getAllBoards, deleteBoard } = require('../controllers/boards/boardController')

// GET routes
router.get('/all/', getAllBoards)
router.get('/:id/', getBoardById)

// POST routes
router.post('/', createNewBoard);

// DELETE routes
router.delete('/:id', deleteBoard);


module.exports = router