//import prisma client
const prisma = require('../../utils/prismaClient');

// POST Handlers
async function createNewUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({'error': 'not all required fields were inputted'});
            return
        }
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        if (newUser) {
            const {password: _, ...safeUser} = newUser;
            res.status(200).json(safeUser);
        }

    } catch(error) {
        console.error(error);
        res.status(500).send('Error in trying to create a new user');
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
                    inlcude : {
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
        const users = await prisma.user.findMany();

        if (users) {
            res.status(200).json(users);
        }

    } catch(error) {
        console.error(error);
        res.status(500).send('Error fetching this specific user');
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


module.exports = {getUserById, getAllUsers, createNewUser};