"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express"), bodyParser = require("body-parser"), swaggerJsdoc = require("swagger-jsdoc"), swaggerUi = require("swagger-ui-express");
var app = express();
var port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/user', function (req, res) {
    var testUser = {
        username: "testuser",
        publicKey: "testkey"
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(testUser);
});
app.post('/message', function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
});
app.listen(port, function () {
    console.log("Example app listening on port ${port}");
});
var options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Cryptalk API",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "",
                url: "",
                email: "",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
var specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
