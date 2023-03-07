const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');

let controller = {}

controller.addLocation = async (req, res) => {
  //check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //create new location based off of json body
  const newLocation = {
    name: req.body.name,
    coordinates: req.body.coordinates,
    description: req.body.description,
    image: req.body.image,
    poplulation: req.body.poplulation,
    areaType: req.body.areaType,
    hospitalityLevel: req.body.hospitalityLevel
  }

  //make call to db lOTR in collection Locations
  const result = await mongodb.getDb().db('LOTR').collection('Locations').insertOne(newLocation);

  //check result
  if(result.acknowledged){
    res.status(201).json({
      message: "Thanks for adding a location",
      body: result
    });
  } else{
    res.status(500).json(response.error || "Unknown Error");
  }
}

module.exports = controller;