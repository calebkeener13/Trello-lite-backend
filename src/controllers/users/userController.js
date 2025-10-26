//import prisma client
const prisma = require('../../utils/prismaClient');

// POST Handlers
async function createNewUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const isAdmin = req.body.isAdmin === "true" || req.body.isAdmin === true;

        if (!name || !email || !password) {
            res.status(400).json({'error': 'not all required fields were inputted'});
            return
        }
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                isAdmin
            }
        });

        if (newUser) {
            const {password: _, ...safeUser} = newUser;
            res.status(201).json(safeUser);
        }

    } catch(error) {
        console.error(error);
        console.log("Users fetched:", users);
        res.status(500).json({
            "Error": "Error trying to create a new user"
        });
    }
}

// GET Handlers
async function getUserById(req, res) {
    try {
        const id = parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: {id: id},
            include: {
                userCards: true,
                boards: {
                    include : {
                        lists: {
                            include: {
                                cards: true
                            }
                        }
                    }
                }
            }
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({'error': 'User not found'});
        }

    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


async function getAllUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {createdAt: 'desc'}
        });

        if (users) {
            res.status(200).json(users);
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": error
        });
    }
};

// DELETE Handlers
async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const deleted = await prisma.user.delete({
            where: {id: parseInt(id)}
        });

        res.status(200).json(deleted);

    } catch(error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
}


module.exports = { getUserById, getAllUsers, createNewUser, deleteUser };