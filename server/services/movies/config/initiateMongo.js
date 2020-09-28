const { MongoClient } = require('mongodb');

const dbName = process.env.dbName || 'Entertain_Me';
const url = process.env.URL || 'mongodb://localhost:27017/';

const client = new MongoClient(url, {
    useUnifiedTopology: true
});
client.connect();

const db = client.db(dbName);

module.exports = db