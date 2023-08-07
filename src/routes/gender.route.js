const { getAll, create, getOne, remove, update } = require('../controllers/gender.controller');
const express = require('express');

const routerGender = express.Router();

routerGender.route('/')
    .get(getAll)
    .post(create);

routerGender.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerGender;