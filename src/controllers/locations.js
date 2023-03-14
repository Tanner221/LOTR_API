const { BSONTypeError } = require('bson');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

let controller = {}

controller.getAllLocations = async (req, res) => {
  const result = await mongodb.getDb().db('LOTR').collection('Locations').find();
  result.toArray().then(
    (items) => {
      if(items.length > 0){
        res.status(200).json(items)
      } else {
        res.status(404).json({
            message: "No locations found"
          });
      }
    }
  )
}

controller.getOneLocation = async (req, res) => {
  let id;
  try{
    id = new ObjectId(req.params.id);
  }
  catch(e){
    if(e instanceof BSONTypeError){
      res.status(400).json({
        message: 'Bad id type'
      })
    }
  }
  const result = await mongodb.getDb().db('LOTR').collection('Locations').find({_id: id});
  result.toArray()
  .then(
    (items) => {
      if(items.length > 0){
        res.status(200).json(items[0]);
      }
      else{
        res.status(404).json({
          message: 'Error: No location found'
        })
      }
    }
  )

}

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
    population: req.body.population,
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