//import prisma client
const prisma = require('../../utils/prismaClient');
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// Register Route
async function registerUser(req, res) {
    try {
        const { email, password, name } = req.body;
        const isAdmin = req.body.isAdmin === "true" || req.body.isAdmin === true;

        if (!email || !password || !name) {
            return res.status(400).json({
                "Error": "Did not enter one or many of the following: name, email, password"
            });
        }

        const dupeUser = await prisma.user.findUnique({
            where: {email: email}
        });

        if (dupeUser) {
            return res.status(400).json({
                "Error": "Unable to create user with provided credentials"
            });
        }

        // hash password with 10 saltRounds
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                isAdmin: isAdmin
            }
        });

        if (newUser) {
            const { password, ...safeUser } = newUser;
            res.status(201).json({
                success: true,
                message: "User created successfully",
                newUser: safeUser
            });
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal server error"
        });
    }
}

// Login route
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                Error: "Invalid username or password"
            });
        }

        const desiredUser = await prisma.user.findUnique({
            where: {email: email}
        });

        if (!desiredUser) {
            return res.status(400).json({
                Error: "User with these credentials does not exist"
            })
        }

        const isValid = await bcrypt.compare(password, desiredUser.password);
        if (!isValid) {
            return res.status(400).json({
                Error: "Invalid password"
            });
        }

        const payload = {id: desiredUser.id, name: desiredUser.name, email: desiredUser.email, isAdmin: desiredUser.isAdmin};

        // signing and creating a mew token
        const newToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        const { password: hashedPassword, ...safeUser} = desiredUser;
        res.status(200).json({
            message: "Login is Successful",
            token: newToken,
            user: safeUser
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            "Error": "Internal server error"
        });
    }
}

module.exports = { registerUser, loginUser };