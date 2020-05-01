const request = require('supertest');
const app = require('../src/app');
const nock = require('nock');

describe('My jokes API', () => {
  describe('API GET /', () => {
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
  it('that this is the jokes endpoint', done => {
    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(
          'You have reached the jokes endpoint, please laugh with care',
        );
        done();
      });
  });
  it('should respond with a random joke message', done => {
    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('No jokes here yet, try again!');
        done();
      });
  });
  it('test to get jokes with personalised names ', done => {
    request(app)
      .get('/jokes/random/personal/Saint/Last')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Hi, i can personalise your jokes!');
        done();
      });
  });
});
