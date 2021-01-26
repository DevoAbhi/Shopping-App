const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Abhinab:GwtyxWee4MWIBfot@cluster.e2ips.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(result => {
        console.log("MongoDB Connected!");
        _db = result.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    else {
        throw "No Database found!";
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
