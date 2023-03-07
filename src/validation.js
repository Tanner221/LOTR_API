const { check } = require('express-validator');

exports.CheckLocationValidation = [
  check('name', 'Name of Location is Required').not().isEmpty()
]