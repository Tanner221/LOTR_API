const { check } = require('express-validator');

exports.CheckLocationValidation = [
  check('name', 'Name of the location is required').escape().trim().not().isEmpty(),
  check('coordinates', 'Coordinates of the location is requried').escape().trim().not().isEmpty(),
  check('description', 'Description of the location is required').escape().trim().not().isEmpty(),
  check('image', 'Image path of the location is requried').escape().trim().not().isEmpty(),
  check('poplulation', 'The population of an area must be included').escape().trim().not().isEmpty(),
  check('areaType', 'The area type is required').escape().trim().not().isEmpty(),
  check('hospitalityLevel', 'How hospitibal is the area? Level 1-5').escape().trim().not().isEmpty()
]