const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const mongoose = require('mongoose');
const mongoConnect = require("./util/database").mongoConnect;
const globalErrorHandler = require('./controller/errorController')
const userRouter = require('./routes/userRoute');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    process.exit(1);
});

const app = express();

const _db = 'mongodb+srv://joep:Sales123@storefront.laejd.mongodb.net/storefront?retryWrites=true&w=majority';

mongoose.connect(_db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected'))
    .catch((error) => console.log(error))
// Database Connection
// mongoConnect();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this Ip, please try again in an hour'
});

app.use('/' ,limiter);

app.use(express.json({limit: '10kb'}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// app.use(hpp({
//     whitelist: [
//         'duration'
//     ]
// }))

// Server Listen
const server = app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
});

// Routes
app.use('/users', userRouter);

// Request handling
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find url ${req.originalUrl}`
    })
});

// Errors in api check
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
})


// Global Error
// app.use(globalErrorHandler);
module.exports = app;
