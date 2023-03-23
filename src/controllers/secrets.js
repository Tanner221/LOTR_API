const mongodb = require("../db/connect")
const ObjectId = require("mongodb").ObjectId
const {validationResult} = require("express-validator")

const getAll = async (req, res) => {
	const result = await mongodb.getDb().db('LOTR').collection("Secrets").find()
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getSingle = async (req, res) => {
	const userId = new ObjectId(req.params.id)
	const result = await mongodb
		.getDb()
		.db('LOTR')
		.collection("Secrets")
		.find({ _id: userId })
	result.toArray().then((lists) => {
    if(lists.length > 0){
      res.setHeader("Content-Type", "application/json")
      res.status(200).json(lists[0])
    }
		else{
      res.status(404).json({
        message: "Error, no secrets found"
      })
    }
	})
}

const addSecret =async(req, res) =>{
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
      const Secret = {
		title: req.body.title,
		race: req.body.race,
		description: req.body.description
	  };
	  const response = await mongodb.getDb().db('LOTR').collection('Secrets').insertOne(Secret);
	  if (response.acknowledged) {
		res.status(201).json(response);
	  } else {
		res.status(500).json(response.error || 'Some error occurred while creating the Secret.');
	  }
	};

const updateSecret =async(req, res) =>{
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
	const userId = new ObjectId(req.params.id);
	const Secret = {
		title: req.body.title,
		race: req.body.race,
		description: req.body.description
	  };
	const response = await mongodb
	  .getDb()
	  .db('LOTR')
	  .collection('Secrets')
	  .replaceOne({ _id: userId }, Secret);
	console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the Secret.');
	}
  };

const deleteSecret =async(req, res) => {
	const userId = new ObjectId(req.params.id);
	const response = await mongodb.getDb().db('LOTR').collection('Secrets').remove({ _id: userId }, true);
	console.log(response);
	if (response.deletedCount > 0) {
	  res.status(200).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while deleting the Secret.');
	}
  };


module.exports = {getAll, getSingle, addSecret, deleteSecret, updateSecret}