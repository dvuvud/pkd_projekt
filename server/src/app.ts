// npx tsc; node ../dist/app.js
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log("Got Request!!!!");
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
    console.log("Got Request!!!!");
  res.send('Hello test!');
});

app.listen(port, () => {
  return console.log("Express is listening at http://localhost:${port}");
});