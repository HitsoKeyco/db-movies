const express = require('express');
const router = express.Router();
const routerGenre = require('./genre.route')
const routerActor = require('./actor.route')
const routerDirector = require('./director.route')
const routerMovie = require('./movie.route')


router.use('/genres', routerGenre)

router.use('/actors', routerActor)
router.use('/directors', routerDirector)
router.use('/movies', routerMovie)
router.use(`/movies/:id/genres`, routerGenre)
router.use('/movies/:id/actors', routerGenre)
router.use('/movies/:id/directors', routerGenre)


module.exports = router;