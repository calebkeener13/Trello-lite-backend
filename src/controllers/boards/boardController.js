//import prisma client
const prisma = require('../utils/prismaClient');

// actual handler functions
const getAllBoards = (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).json({'id': 1, 'title': 'Sprint 1'});
}

const getBoardById = (req, res) => {
    id = req.params.id;
    res.set('Content-Type', 'text/plain');
    res.status(200).send(`Id is ${id}`);
}

module.exports = { getAllBoards, getBoardById };