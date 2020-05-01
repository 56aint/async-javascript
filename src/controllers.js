// import { re } from 'prettier';
const request = require('request');

const mainController = (req, res) =>
  res.send({
    message: 'Welcome to my jokes API!',
  });

const jokesController = (req, res) =>
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body);

    res.send({ jokes: parsedResponse.value });
  });
/* res.send({
    message: 'This is the jokes endpoint',
  }); */

const randomJokesController = (req, res) =>
  res.send({
    message: 'No jokes here yet, try again!',
  });
const personalJokeController = (req, res) =>
  res.json({
    message: 'Hi, i can personalise your jokes!',
  });

module.exports = {
  mainController,
  jokesController,
  randomJokesController,
  personalJokeController,
};
