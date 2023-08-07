const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
const Gender = require('../models/Gender')

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll( {
        include: [ 
            {
                model: Gender,
                attributes: ["name"]
            },
            {
                model: Actor,
                attributes: ["firstName", "lastName", "nationality", "image", "birthday"]
            },
            {
                model: Director,
                attributes: ["firstName", "lastName", "nationality", "image", "birthday"]
            }

        ]}) 
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(400);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(400);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(400);
    return res.json(result[1][0]);
});

const setGenres = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id); 
    if(!movie) return res.sendStatus(400)

    await movie.setGenders(req.body)
    const genres = await movie.getGenders() 
    return(res.json(genres))
});

const setActors = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id); 
    if(!movie) return res.sendStatus(400)

    await movie.setActors(req.body)
    const actors = await movie.getActors() 
    return(res.json(actors))
});

const setDirectors = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id); 
    if(!movie) return res.sendStatus(400)

    await movie.setDirectors(req.body)
    const directors = await movie.getDirectors() 
    return(res.json(directors))
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setActors,
    setDirectors,
}