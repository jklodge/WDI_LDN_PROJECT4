/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

describe('POST /login', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a token', done => {
    api
      .post('/api/login')
      .send(userData)
      .end((err, res) => {
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });

  it('should return a 401 response if the password is bad', done => {
    const badData = { email: 'test@test.com', password: 'bad' };

    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 401 response if the user doesn\'t exist', done => {
    const badData = { email: 'bad@test.com', password: 'test' };

    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});
