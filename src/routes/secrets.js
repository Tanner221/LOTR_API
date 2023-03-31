const routes = require("express").Router()
const controller = require("../controllers/secrets")
const {secretValidation} = require("../validation")
const { requiresAuth } = require('express-openid-connect');

routes.get("/", requiresAuth(), controller.getAll)

routes.get("/:id", controller.getSingle)

routes.post("/", secretValidation, controller.addSecret)

routes.put("/:id", secretValidation, controller.updateSecret)

routes.delete("/:id",  controller.deleteSecret)

module.exports = routes