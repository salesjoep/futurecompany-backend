const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');

const app = express();

const _db = 'mongodb+srv://user:pass123@thefuturecompany.fb8z5.mongodb.net/storefront?retryWrites=true&w=majority';

// accept url encoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// accept json
app.use(bodyParser.json());

mongoose.connect(_db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected'))
    .catch((error) => console.log(error));

app.use(express.json({limit: '10kb'}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}))

const server = app.listen(3001, () => {
    console.log('Listening on port 3001!!!!!!!!!');
});

app.use('/products', productRoute);