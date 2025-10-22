//import prisma client
const prisma = require('../../utils/prismaClient');

// POST handlers
async function createNewBoard(req, res) {
    try {
        const { title, userId } = req.body;

        if (!title || !userId) {
            return res.status(400).json({"Error": "Client send invalid data or didn't fill the required fields."});
        }

        const newBoard = await prisma.board.create({
            data: {
                title: title,
                user: {connect: {id: parseInt(userId)}},
            }
        })

        res.status(201).json(newBoard);

    } catch(error) {
        console.error(error)
        return res.status(500).json({'Error': 'Internal Server error'});
    }
}

// GET handlers
async function getAllBoards(req, res) {
    try {
        const allBoards = await prisma.board.findMany({
            orderBy: {createdAt: 'desc'}
        });

        if (allBoards) {
            res.status(200).json(allBoards);
        } else {
            res.status(404).json({
                "Error": "desired users not found in database"
            });
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal server error"
        });
    }
}

async function getBoardById(req, res) {
    try {
        const desiredId = req.params.id;

        const desiredBoard = await prisma.board.findUnique({
            where: {id: parseInt(desiredId)},
            include: {
                lists: {
                    include: {
                        cards: true
                    }
                }
            }
        });

        if (!desiredBoard) {
        return res.status(404).json({
            error: "Could not find desired board",
        });
        }

        res.status(200).json(desiredBoard)

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            "Error": "Internal Error"
        });
    }
}

module.exports = { createNewBoard, getBoardById, getAllBoards };