const axios = require('axios');

const jokesController = async (req, res) => {
  try {
    const response = await axios.get(`https://api.icndb.com/jokes`);

    res.send({ jokes: response.data.value });
  } catch (error) {
    res.status(error.statusCode).send({ error: error.message });
  }
};

const randomJokesController = async (req, res) => {
  try {
    const response = await axios.get(`https://api.icndb.com/jokes/random?exclude=[explicit]`);

    res.send({ randomJoke: response.data.value });
  } catch (error) {
    res.status(error.statusCode).send({ error: error.message });
  }
};

const personalJokeController = async (req, res) => {
  const { first, last } = req.params;

  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );

    res.send({ personalJoke: response.data.value });
  } catch (error) {
    res.status(error.statusCode).send({ error: error.message });
  }
};

module.exports = {
  jokesController,
  randomJokesController,
  personalJokeController,
};
