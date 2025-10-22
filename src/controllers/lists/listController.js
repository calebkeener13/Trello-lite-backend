//import prisma client
const prisma = require('../../utils/prismaClient');

// actual handler functions
const getListById = (req, res) => {
    id = req.params.id;
    res.set('Content-Type', 'text/plain');
    res.status(200).send(`List ID is ${id}`);
}

module.exports = { getListById };