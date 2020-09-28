const TvSeries = require('../models')

class TvSeriesController {
    static async getAll (req, res) {
        const allSeries = await TvSeries.getAll()
        const displaySeries = allSeries.filter(series => series._id != null)
        return res.status(200).json(displaySeries)
      }
    
      static async getOne (req, res) {
        const series = await TvSeries.getOne(req.params.id)
        return res.status(200).json(series)
      }
    
      static async add (req, res) {
        const newOne = { ... req.body}
        const addOne = await TvSeries.addOne(newOne)
        return res.status(201).json(addOne.ops[0])
      }
    
      static async update( req, res) {
        const updateData = { ... req.body}
        const doUpdate = await TvSeries.update(req.params.id, updateData)
        return res.status(200).json(doUpdate.value)
      }
    
      static async delete (req, res) {
          console.log('----------1');
        const doDelete = await TvSeries.delete(req.params.id)
        return res.status(200).json(doDelete)
      }
}

module.exports = TvSeriesController;