const express = require('express')
const router = express.Router()

// import verify token
const verifyToken = require('../middleware/authMiddleware');

// import board controller
const { createNewBoard, getBoardById, getAllBoards, deleteBoard } = require('../controllers/boards/boardController')

// global middleware for protected route
router.use(verifyToken);

// GET routes
router.get('/all', getAllBoards)
router.get('/:id', getBoardById)

// POST routes
router.post('/', createNewBoard);

// DELETE routes
router.delete('/:id', deleteBoard);


module.exports = router