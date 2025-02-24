var express = require("express"), bodyParser = require("body-parser"), swaggerJsdoc = require("swagger-jsdoc"), swaggerUi = require("swagger-ui-express");
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/user', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send('{ username: Vinpool, displayName: Vincent }');
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
