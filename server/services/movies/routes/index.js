const router = require('express').Router();
const MoviesController = require('../controllers/MoviesController');

router.get('/movies', MoviesController.getAll);
router.get('/movies/:id', MoviesController.getOne);
router.post('/movies', MoviesController.create);
router.put('/movies/:id', MoviesController.update);
router.delete('/movies/:id', MoviesController.delete);

module.exports = router