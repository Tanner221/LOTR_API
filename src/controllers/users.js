const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db("LOTR").collection("Users").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("LOTR")
    .collection("Users")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = {
    userId: req.body.userId,
    name: req.body.name,
    race: req.body.race,
    email: req.body.email,
  };
  const response = await mongodb
    .getDb()
    .db("LOTR")
    .collection("Users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the User.");
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    userId: req.body.userId,
    name: req.body.name,
    race: req.body.race,
    email: req.body.email,
  };
  const response = await mongodb
    .getDb()
    .db("LOTR")
    .collection("Users")
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the User.");
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("LOTR")
    .collection("Users")
    .remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the User.");
  }
};

module.exports = {
  getAll,
  getSingle,
  addUser,
  deleteUser,
  updateUser,
};
