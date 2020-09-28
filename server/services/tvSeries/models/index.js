const db = require('../config/initiateMongo');
const { ObjectID } = require('mongodb');
const TvSeriesCollection = db.collection('TvSeries');

class TvSeries {
    static getAll() {
        return TvSeriesCollection.find().toArray()
    }

    static getOne(id) {
        return TvSeriesCollection.findOne({ "_id": ObjectID(id)})
    }

    static addOne(newOne) {
        return TvSeriesCollection.insertOne(newOne)
    }

    static async update(id, newData) {
        return TvSeriesCollection.findOneAndUpdate({ "_id": ObjectID(id)}, { $set: newData}, {returnOriginal: false})
    }

    static async delete(id) {
        console.log('--------2');
        return TvSeriesCollection.findOneAndDelete({ "_id": ObjectID(id) })
    }
}

module.exports = TvSeries;