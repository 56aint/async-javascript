// import { mainController } from './controllers';
const express = require('express');

const {
  mainController,
  jokesController,
  randomJokesController,
  personalJokeController,
} = require('./controllers');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokesController);

app.get('/jokes/random/personal/:first/:last', personalJokeController);

module.exports = app;
