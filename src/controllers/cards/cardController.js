const prisma = require('../../utils/prismaClient');

// POST Handlers
async function createNewCard(req, res) {
    try {
        const { title, listId, userId } = req.body;
        const dueDate = req.body.dueDate || null;
        const description = req.body.description || null;

        if (!title || !listId) {
            return res.status(400).json({
                "Error": "Did not enter title or invalid title"
            })
        }

        if (!userId) {
            return res.status(403).json({
                "Error": "not a verified user"
            });
        }

        const newCard = await prisma.card.create({
            data: {
                title: title,
                list: {connect: {id: parseInt(listId)}},
                dueDate: dueDate,
                description: description
            }
        });

        const cardId = newCard.id;

        const newUserCard = await prisma.userCard.create({
            data: {
                user: {connect: {id: parseInt(userId)}},
                card: {connect: {id: cardId}}
            }
        });

        res.status(201).json(newCard);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal Server Error"
        })
    }
}

// GET Handlers
async function getCardById(req, res) {
    try {
        const desiredId = req.params.id;

        const desiredCard = await prisma.card.findUnique({
            where: {id: desiredId},
            includ: {
                userCards: true
            }
        });

        if (!desiredCard) {
            return res.status(404).json({
                "Error": "desired card not in database"
            });
        }

        res.status(200).json(desiredCard);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal Server Error"
        })
    }
}

async function getAllCards(req, res) {
    try {
        const allCards = await prisma.card.findMany({
            orderBy: {createdAt: 'desc'},
            include: {
                userCards: true
            }
        });

        if (!allCards) {
            return res.status(404).json({
                "Error": "no cards in database"
            })
        }

        res.status(200).json(allCards);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal Server Error"
        })
    }
}

// DELETE Handlers
async function deleteCard(req, res) {
    try {
        id = parseInt(req.params.id);

        const deletedCard = await prisma.card.delete({
            where: {id: id}
        });

        const deleteUserCard = await prisma.userCard.delete({
            where: {cardId: id}
        });

        res.status(200).json(deletedCard);

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal Server Error"
        })
    }
}

module.exports = { getCardById, getAllCards, createNewCard, deleteCard };