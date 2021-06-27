const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
    MongoClient.connect('mongodb+srv://user:pass123@thefuturecompany.fb8z5.mongodb.net/storefront?retryWrites=true&w=majority')
        .then(x => {
            console.log(
                `Connected to Mongo!`
            );
        })
        .catch(err => {
            console.error("Error connecting to mongo", err);
        });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database found!';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;





