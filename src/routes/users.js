const routes = require("express").Router();
const controller = require("../controllers/users");
const { userValidation } = require("../validation");
const { requiresAuth } = require("express-openid-connect");

routes.get("/", controller.getAll);

routes.get("/:id", controller.getSingle);

routes.post("/", userValidation, controller.addUser);

routes.put("/:id", userValidation, controller.updateUser);

routes.delete("/:id", controller.deleteUser);

module.exports = routes;
