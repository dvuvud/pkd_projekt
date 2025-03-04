const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
  
import { type User } from './types/user';
import { type Message } from './types/message'
import { post_message, get_message } from './endpoints/message'

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
  res.send('Server working!');
});

app.post('/message', (req, res) => {
  post_message(req.body);
  res.sendStatus(200);
});

app.get('/message', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(get_message());
});


app.listen(port, () => {
  console.log("Example app listening on port ${port}")
});

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Cryptalk API",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
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
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
  );