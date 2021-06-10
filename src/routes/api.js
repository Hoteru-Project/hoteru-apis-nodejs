const express = require('express');
const route = express.Router();
const middlewares = require("../middlewares");

const hotelController = require("../controllers/Api/HotelController");
const loginController = require("../controllers/Api/Auth/LoginController");

route.use(middlewares["ApiMiddleware"]);

// TODO API routes Written down there as follows

route.post("/auth/login", express.json(), loginController.login)

route.get("/:provider/", express.json(), middlewares["AuthMiddleware"], hotelController.index);
route.get("/:provider/:id", express.json(), middlewares["AuthMiddleware"], hotelController.show);

route.post("/:provider", express.json(), middlewares["AuthMiddleware"], hotelController.store);

module.exports = route;
