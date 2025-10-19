const express = require('express');
const app = express();

// router imports
const userRouter = require('./src/routes/userRoutes');
const boardRouter = require('./src/routes/boardRoutes');

//global middleware
app.use(express.json());

app.use('/user', userRouter)
app.use('/board', boardRouter)

const PORT = 3010
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});