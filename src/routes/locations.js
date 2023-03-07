const routes = require('express').Router();
const validator = require('../validation');
const locationsController = require('../controllers/locations')

routes.post('/', validator.CheckLocationValidation,locationsController.addLocation)

module.exports = routes