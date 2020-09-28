const router = require('express').Router();
const MoviesController = require('../controllers/MoviesController');
const TvSeriesController = require('../controllers/TvSeriesController');
const MainController = require('../controllers/MainController');

router.get('/', MainController.getAll);

router.get('/movies', MoviesController.getAll);
router.get('/movies/:id', MoviesController.getOne);
router.post('/movies', MoviesController.add);
router.put('/movies/:id', MoviesController.update);
router.delete('/movies/:id', MoviesController.delete);


router.get('/tvSeries', TvSeriesController.getAll);
router.get('/tvSeries/:id', TvSeriesController.getOne);
router.post('/tvSeries', TvSeriesController.add);
router.put('/tvSeries/:id', TvSeriesController.update);
router.delete('/tvSeries/:id', TvSeriesController.delete);

module.exports = router