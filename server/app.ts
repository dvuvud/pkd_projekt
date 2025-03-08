const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
  
import { type User } from '../types/user';
import { type Message } from '../types/message'
import { post_message, get_message } from './endpoints/message'
import { create_user, find_user } from './endpoints/user';

var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
  res.send('Server working!');
});

app.post('/message', cors(corsOptions), (req, res) => {
  // Messages now need user objects in order to be correctly sent and received
  post_message(req.body);
  res.sendStatus(200);
});

app.post('/user', cors(corsOptions), (req, res) => {
  const user: User = req.body;
  create_user(user);
  res.sendStatus(user.username);
});

app.get('/user', cors(corsOptions), (req, res) => {
  res.send(find_user(req.query.username));
});

app.get('/message', cors(corsOptions), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // Messages now need user objects in order to be correctly sent and received
  if (find_user(req.query.sender) )
  res.send(get_message(req.query.recipient, req.query.sender));
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
          url: "http://localhost:5000",
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