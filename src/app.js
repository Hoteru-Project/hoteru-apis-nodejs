const express = require('express');
const path = require('path');
const routes = require('./routes')
const cors = require("cors")
const helmet = require("helmet")
const app = express();



app.use(cors())
app.use(helmet())

// App public directories
app.use(process.env.STATIC_URL, express.static(path.join(__dirname, "/public/static_root")));
app.use(process.env.MEDIA_URL, express.static(path.join(__dirname, "/public/media_root")));

// Template Engine and Views Directory
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");

// Routes
app.use("/api", routes.apiRouter);
app.use("/", routes.webRouter);


module.exports = app;
