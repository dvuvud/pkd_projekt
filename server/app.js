"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express"), bodyParser = require("body-parser"), swaggerJsdoc = require("swagger-jsdoc"), swaggerUi = require("swagger-ui-express");
var message_1 = require("./endpoints/message");
var user_1 = require("./endpoints/user");
var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
var app = express();
var port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/', function (req, res) {
    res.send('Server working!');
});
app.post('/message', cors(corsOptions), function (req, res) {
    // Messages now need user objects in order to be correctly sent and received
    (0, message_1.post_message)(req.body);
    res.sendStatus(200);
    console.log();
});
app.get('/message', cors(corsOptions), function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // Messages now need user objects in order to be correctly sent and received
    res.send((0, message_1.get_message)(req.query.user1, req.query.user2));
});
app.post('/user', cors(corsOptions), function (req, res) {
    var user = req.body;
    (0, user_1.create_user)(user);
    res.send(user.username);
});
app.get('/user', cors(corsOptions), function (req, res) {
    var user = (0, user_1.find_user)(req.query.username);
    res.send(user);
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
                url: "http://localhost:".concat(port),
            },
        ],
    },
    apis: ["./routes/*.js"],
};
var specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
