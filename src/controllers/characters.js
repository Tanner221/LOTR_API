const mongodb = require("../db/connect")
const ObjectId = require("mongodb").ObjectId
const {validationResult} = require("express-validator")

const getAll = async (req, res) => {
	const result = await mongodb.getDb().db().collection("Characters").find()
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getSingle = async (req, res) => {
	const userId = new ObjectId(req.params.id)
	const result = await mongodb
		.getDb()
		.db()
		.collection("Characters")
		.find({ _id: userId })
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists[0])
	})
}

const addCharacter =async(req, res) =>{
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
	const character = {
		name: req.body.name,
		race: req.body.race,
		description: req.body.description,
		history: req.body.history,
		appearances: req.body.appearances,
		bodycount: req.body.bodycount,
		birth: req.body.birth,
		death: req.body.death
	  };
	  const response = await mongodb.getDb().db().collection('Characters').insertOne(character);
	  if (response.acknowledged) {
		res.status(201).json(response);
	  } else {
		res.status(500).json(response.error || 'Some error occurred while creating the contact.');
	  }
	};

const updateCharacter =async(req, res) =>{
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
	const userId = new ObjectId(req.params.id);
	const character = {
		name: req.body.name,
		race: req.body.race,
		description: req.body.description,
		history: req.body.history,
		appearances: req.body.appearances,
		bodycount: req.body.bodycount,
		birth: req.body.birth,
		death: req.body.death
	  };
	const response = await mongodb
	  .getDb()
	  .db()
	  .collection('Characters')
	  .replaceOne({ _id: userId }, character);
	console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the workout.');
	}
  };

const deleteCharacter =async(req, res) => {
	const userId = new ObjectId(req.params.id);
	const response = await mongodb.getDb().db().collection('Characters').remove({ _id: userId }, true);
	console.log(response);
	if (response.deletedCount > 0) {
	  res.status(200).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while deleting the workout.');
	}
  };


module.exports = {getAll, getSingle, addCharacter, deleteCharacter, updateCharacter}