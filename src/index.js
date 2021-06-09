'use strict';

require('dotenv').config({path: __dirname + "/../.env"});
const mongoose = require('mongoose');
const app = require('./app');
const connection = connect();


connection
    .on("error", console.log)
    .on("disconnect", connect)
    .on("open", listen)

function connect() {
    const options = {keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true};
    mongoose.connect(process.env.MONGODB_URL, options);
    return mongoose.connection;
}

function listen() {
    app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME);
}
