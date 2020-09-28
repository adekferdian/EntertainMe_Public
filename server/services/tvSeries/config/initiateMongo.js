const { MongoClient } = require('mongodb');

const url = process.env.PORT || 'mongodb://localhost:27017/';
const dbName = process.env.dbName || 'Entertain_Me';

const client = new MongoClient(url, {
    useUnifiedTopology: true
});
client.connect();

const db = client.db(dbName);

module.exports = db;