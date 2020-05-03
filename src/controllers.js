// import { re } from 'prettier';
const request = require('request');
const axios = require('axios');

const mainController = (req, res) =>
  res.send({
    message: 'Welcome to my jokes API!',
  });

const jokesController = (req, res) =>
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    // making request to jokesApi
    if (error) {
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body); // response from jokesApi is JSON.stringified so i JSON.parse it
    // console.log(parsedResponse);
    res.send({ jokes: parsedResponse.value });
  });
/* res.send({
    message: 'This is the jokes endpoint',
  }); */

const randomJokesController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      // eslint-disable-next-line
          console.log(error);
    });
};
/* res.send({
  randomJoke: 'No jokes here yet, try again!',
}); */

const personalJokeController = async (req, res) => {
  const { first, last } = req.params;

  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );

    return res.send({ personalJoke: response.data.value });
  } catch (error) {
    console.log(error);
  }
};
/* const personalJokeController = (req, res) =>
  res.json({
    message: 'Hi, i can personalise your jokes!',
  }); */

module.exports = {
  mainController,
  jokesController,
  randomJokesController,
  personalJokeController,
};
