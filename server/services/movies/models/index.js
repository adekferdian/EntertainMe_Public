const db = require('../config/initiateMongo');
const { ObjectID } = require('mongodb');
const MovieCollection = db.collection('Movies');

class Movie {
    static getAll() {
        return MovieCollection.find().toArray();
    };

    static getOne(id) {
        return MovieCollection.findOne({ "_id": ObjectID(id)});
    };

    static addOne(newMovie) {
        return MovieCollection.insertOne(newMovie);
    };

    static async update(id, updateMovie) {
        return MovieCollection.findOneAndUpdate(
            {_id: ObjectID(id)},
            { $set: updateMovie},
            {returnOriginal: false}
        );
    };

    static async delete(id) {
        return MovieCollection.findOneAndDelete({"_id": ObjectID(id)});
    };
};

module.exports = Movie;