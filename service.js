'use strict';
// require('newrelic');
global.__rootDir = __dirname;
const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const routes = require("./src/routes/router");


const initializeApp = async () => {
    const port = process.env.PORT;
    require('./config/express/index')(app, express);

    app.use(routes);
    app.use(require('./src/middleware/error'));
    
    app.listen(port, () => {
        console.log(`--- Service listening at ${process.env.NODE_ENV} ${port} ---`);
    });

    process.on('uncaughtException', function (err) {
        console.error(err);
        console.log("Node NOT Exiting...", err);
    });

};

const bootstrap = async () => {
    await initializeApp();
};

module.exports = bootstrap;