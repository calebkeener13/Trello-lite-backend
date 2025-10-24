//import prisma client
const { all } = require('../../routes/userRoutes');
const prisma = require('../../utils/prismaClient');

// GET Handlers
async function getListById(req, res) {
    try {
        const desiredId = req.params.id;

        const desiredList = await prisma.list.findUnique({
            where: {id: parseInt(desiredId)},
            include: {
                cards: true
            }
        });

        if (!desiredList) {
            return res.status(404).json({
                "Error": "Could not find desired list"
            });
        }

        res.status(200).json(desiredList); 

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal Server Error"
        });
    }
}

async function getAllLists(req, res) {
    try {
        const allLists = await prisma.lists.fndMany({
            orderBy: {createdAt: 'desc'}
        });

        if (!allLists) {
            return res.status(404).json({
                "Error": "Could not find desired lists"
            })
        }

        res.status(200).json(allLists);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal Server Error"
        });
    }
}

// POST Handlers
async function createNewList(req, res) {
    try {
        const { title, boardId} = req.body;
        const status = req.query.status;

        if (!title || !status) {
            return res.status(400).json({
                "Error": "Invalid request parameters or no parameters provided"
            })
        }

        const newList = await prisma.list.create({
            data: {
                title: title,
                status: status,
                board: {connect: {id: parseInt(boardId)}}
            }
        });

        res.status(201).json(newList);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal Server Error"
        });
    }
}

// DELETE Handler
async function deleteList(req, res) {
    try {
        const id = req.params.id;

        const deletedList = await prisma.list.delete({
            where: {id: parseInt(id)}
        });

        res.status(200).json(deletedList);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Error deleting desired list"
        });
    }
}

module.exports = { getListById, getAllLists, createNewList, deleteList };