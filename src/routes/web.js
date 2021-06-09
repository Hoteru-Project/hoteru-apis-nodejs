const express = require('express');
const route = express.Router();
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser").urlencoded({extended: false});
const expressLayout = require("express-ejs-layouts");
const middlewares = require("../middlewares");

const registerController = require("../controllers/Auth/RegisterController")
const loginController = require("../controllers/Auth/LoginController")

route.use(cookieParser());
route.use(session({
    name:"SHOPPYSHOP_SESSID",
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true
}));

route.use(expressLayout);
route.use(middlewares["SessionMiddleware"]);

// TODO Web routes Written down there as follows


route.get("/register", middlewares["GuestMiddleware"], registerController.get);
route.post("/register", middlewares["GuestMiddleware"] ,bodyParser, registerController.post);

route.get("/login", middlewares["GuestMiddleware"], loginController.get);
route.post("/login", middlewares["GuestMiddleware"] ,bodyParser, loginController.post);


module.exports = route;
