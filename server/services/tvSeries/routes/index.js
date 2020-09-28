const router = require('express').Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/tvSeries', TvSeriesController.getAll);
router.get('/tvSeries/:id', TvSeriesController.getOne);
router.post('/tvSeries', TvSeriesController.add);
router.put('/tvSeries/:id', TvSeriesController.update);
router.delete('/tvSeries/:id', TvSeriesController.delete);

module.exports = router