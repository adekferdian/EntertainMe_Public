const Movie = require('../models')

class MoviesController {
    static async getAll (req, res) {
        const listMovie = await Movie.getAll();
        return res.status(200).json(listMovie);
    };

    static async getOne (req, res) {
        const movie = await Movie.getOne(req.params.id);
        return res.status(200).json(movie);
    };

    static async create (req, res) {
        const newMovie = { ... req.body };
        const addOne = await Movie.addOne(newMovie)
        return res.status(201).json(addOne.ops[0]);
    };

    static async update (req, res) {
        const updateMovie = { ... req.body };
        const doUpdate = await Movie.update(req.params.id, updateMovie);
        return res.status(200).json(doUpdate);
    };

    static async delete (req, res) {
        const doDelete = await Movie.delete(req.params.id);
        return res.status(200).json(doDelete);
    };
};

module.exports = MoviesController;