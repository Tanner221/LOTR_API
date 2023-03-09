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

// name: req.body.name,
// 		race: req.body.race,
// 		description: req.body.description,
// 		history: req.body.history,
// 		appearances: req.body.appearances,
// 		bodycount: req.body.bodycount,
// 		birth: req.body.birth,
// 		death: req.body.death
exports.CharacterValidation = [
  check('name', 'Name of the character is required').escape().trim().not().isEmpty(),
  check('race', 'You must provide a race').escape().trim().not().isEmpty(),
  check('description', 'Please provide a description').escape().trim().not().isEmpty(),
  check('history', 'Must include History').escape().trim().not().isEmpty(),
  check('appearances', 'Please add the appearances').escape().trim().not().isEmpty(),
  check('bodycount', 'Add a body Count').escape().trim().not().isEmpty(),
  check('birth', 'Please include the birth').escape().trim().not().isEmpty(),
  check('death', 'Please include a death, or none if not yet dead').escape().trim().not().isEmpty(),
]