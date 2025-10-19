const express = require('express')
const router = express.Router()

// import controllers
const { getListById } = require('../controllers/lists/listController')

router.get('/:id', getListById)


module.exports = router