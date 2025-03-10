const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
  
import { type User } from '../types/user';
import { post_message, get_message } from './endpoints/message';
import { create_user, find_user } from './endpoints/user';

var cors = require('cors'); 

var corsOptions = {
  origin: 'https://cryptalk.nettervik.se',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.get('/', function(req, res){
  res.send('Server working!');
});


app.post('/message', cors(corsOptions), (req, res) => {
  post_message(req.body);
  res.sendStatus(200);
});

app.get('/message', cors(corsOptions), (req, res) => {
  let loadAll: boolean = false;
  if(req.query.loadAll === "true"){
        loadAll = true;
  }
  res.send(get_message(req.query.user1, req.query.user2, loadAll));
});

app.post('/user', cors(corsOptions), (req, res) => {
  res.send(create_user(req.body).username);
});

app.get('/user', cors(corsOptions), (req, res) => {
  const user = find_user(req.query.username);
  res.send(user);
});

app.listen(port, "0.0.0.0", () => {
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
          url: `https://cryptalk_backend.nettervik.se:${port}`,

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