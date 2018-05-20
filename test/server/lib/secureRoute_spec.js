/* global describe, it, expect, beforeEach */
const secureRoute = require('../../../lib/secureRoute');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const User = require('../../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};
let token;
let user;
let jsonObject;

const req = { headers: {} };

const res = {
  status: () => {
    return {
      json: (obj) => {
        jsonObject = obj;
      }
    };
  }
};

const next = () => null;

describe('secureRoute', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(_user => {
        user = _user;
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        req.headers.authorization = `Bearer ${token}`;
        done();
      });
  });

  it('should send an Unauthorized with no token', done => {
    delete req.headers.authorization;
    secureRoute(req, res, next);
    expect(jsonObject).to.deep.eq({ message: 'Unauthorized' });
    done();
  });

  it('should find a user from the token and set it to req.currentUser', done => {
    secureRoute(req, res, next)
      .then(() => {
        expect(req.currentUser._id.equals(user._id)).to.be.true;
        done();
      });
  });
});
