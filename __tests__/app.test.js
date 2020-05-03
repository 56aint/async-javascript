/** * @jest-environment node */
const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

describe('MY JOKES API, GET /', () => {
  it('should respond with a welcome message', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Welcome to my jokes API!');
        done();
      });
  });
});

describe('GET /jokes', () => {
  it('that this is the jokes endpoint', done => {
    const mockResponse = {
      type: 'success',
      value: [
        {
          id: 1,
          joke: 'i am a joke',
          categories: [],
        },
        {
          id: 2,
          joke: 'i am another joke',
          categories: [],
        },
      ],
    };

    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual([
          {
            id: 1,
            joke: 'i am a joke',
            categories: [],
          },
          {
            id: 2,
            joke: 'i am another joke',
            categories: [],
          },
        ]);
        done();
      });
  });
});

describe('GET, /jokes/random', () => {
  it('should respond with a random joke message', done => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'i am a random joke',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual({
          categories: [],
          id: 115,
          joke: 'i am a random joke',
        });
        console.log(res.body.randomJoke);
        done();
      });
  });
});

describe('GET /jokes/random/personal', () => {
  it('test to get jokes with personalised names ', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 141,
        joke: 'random joke about manchester codes',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/random/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockResponse.value);
      });
  });
});
