const routes = require("express").Router()
const controller = require("../controllers/characters")
const {CharacterValidation} = require("../validation")
const { requiresAuth } = require('express-openid-connect');

routes.get("/", controller.getAll)

routes.get("/:id", controller.getSingle)

routes.post("/", CharacterValidation, controller.addCharacter)

routes.put("/:id", CharacterValidation, controller.updateCharacter)

routes.delete("/:id",  controller.deleteCharacter)

module.exports = routes