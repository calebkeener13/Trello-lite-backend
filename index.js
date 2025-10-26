const express = require('express');
const app = express();

// import dotenv
const dotenv = require("dotenv");
dotenv.config();

// router imports
const userRouter = require('./src/routes/userRoutes');
const boardRouter = require('./src/routes/boardRoutes');
const listRouter = require('./src/routes/listRoutes');
const cardRouter = require('./src/routes/cardRoutes');
const authRouter = require('./src/routes/authRoutes');

//global middleware
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/board', boardRouter);
app.use('/list', listRouter);
app.use('/card', cardRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});