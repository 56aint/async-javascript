// import { mainController } from './controllers';
const express = require('express');

const {
  // mainController,  // replaced with homepage @ public folder
  jokesController,
  randomJokesController,
  personalJokeController,
} = require('./controllers');

const app = express();

app.use(express.static('public'));

// app.get('/', mainController); // now using express.static to get (/) 'the homepage'

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokesController);

app.get('/jokes/random/personal/:first/:last', personalJokeController);

module.exports = app;
