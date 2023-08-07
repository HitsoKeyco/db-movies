const express = require('express');
const router = express.Router();
const routerGender = require('./gender.route')
const routerActor = require('./actor.route')
const routerDirector = require('./director.route')
const routerMovie = require('./movie.route')


router.use('/genres', routerGender)

router.use('/actors', routerActor)
router.use('/directors', routerDirector)
router.use('/movies', routerMovie)
router.use(`/movies/:id/genres`, routerGender)
router.use('/movies/:id/actors', routerGender)
router.use('/movies/:id/directors', routerGender)


module.exports = router;