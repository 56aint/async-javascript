const express = require('express');

const { jokesController, randomJokesController, personalJokeController } = require('./controllers');

const app = express();

app.use(express.static('public'));

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokesController);

app.get('/jokes/random/personal/:first/:last', personalJokeController);

module.exports = app;
