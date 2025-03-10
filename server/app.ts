import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import { post_message, get_message } from './endpoints/message.js';
import { create_user, find_user } from './endpoints/user.js';
import { Message } from "./types/message.js";

var corsOptions = {
  origin: 'https://cryptalk.nettervik.se',
  optionsSuccessStatus: 200
}

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/message', cors(corsOptions), (req: express.Request, res: express.Response) => {
  const message: Message = req.body;

  post_message(message);
  res.sendStatus(200);
});

app.get('/message', cors(corsOptions), (req: express.Request, res: express.Response) => {
  let loadAll: boolean = false;
  if(req.query.loadAll === "true"){
        loadAll = true;
        
  }

  const user1 = req.query.user1;
  const user2 = req.query.user2;

  if(!user1 || typeof user1 !== "string" || !user2 || typeof user2 !== "string"){
    res.sendStatus(400); // bad request
    return;
  }

  res.send(get_message(user1, user2, loadAll));
});

app.post('/user', cors(corsOptions), (req: express.Request, res: express.Response) => {
  res.send(create_user(req.body).username);
});

app.get('/user', cors(corsOptions), (req: express.Request, res: express.Response) => {
  const username = req.query.username;
  if(!username || typeof username !== "string"){
    res.sendStatus(400); // bad request
    return;
  }

  res.send(find_user(username));
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
          "Cryptalk API",
        license: {
          name: "MIT",
          url: "",
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