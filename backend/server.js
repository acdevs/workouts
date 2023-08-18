require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

const app = express();

//middlewares
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect to db
mongoose.connect(process.env.DB_URI)
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log('Server started on port', process.env.PORT);
        })

    })
    .catch((err) => {
        console.log(err);
    })
