const routes = require('express').Router();
const validator = require('../validation');
const locationsController = require('../controllers/locations')

routes.get('/', locationsController.getAllLocations)
routes.get('/:id', locationsController.getOneLocation)
routes.post('/', validator.CheckLocationValidation,locationsController.addLocation)
routes.delete('/:id', locationsController.deleteLocation)

module.exports = routes