const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Abhinab:GwtyxWee4MWIBfot@cluster.e2ips.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(result => {
        console.log("MongoDB Connected!");
        callback(result);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = mongoConnect;
