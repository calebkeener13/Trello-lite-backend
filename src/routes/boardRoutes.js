const express = require('express')
const router = express.Router()

// import board controller
const { getAllBoards, getBoardById } = require('../controllers/boards/boardController')

router.get('/all/', getAllBoards)
router.get('/:id', getBoardById)


module.exports = router