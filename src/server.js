require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

const port = process.env.PORT || 5000
const http = require('http').createServer(app)

// const socketIo = require('socket.io');
// const socketRouter = require('./routes/socketRouter')
const mainRouter = require('./routes/mainRouter')

// const io = socketIo(http, {
//     cors: {
//         origin: 'http://localhost:3000',
//     },
// });

http.listen(port);
// app.set('socketio', io)

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected Successfully!')
    })
    .catch((error) => {
        consolrroerror.log('Error:', error)
    });

// Middleware

app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: 'GET,HEAD,PUT,POST',
    })
);
app.use(morgan('dev'))

// Routes
app.use('/', mainRouter)

// socketRouter(io)

