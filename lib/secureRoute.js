const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/user');

// middleware for stopping Unauthorized users from accessing certain pages

function secureRoute(req, res, next) {
  // if there is no authorization in the header of the request, return 401 status - Unauthorized
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  // the header of the request returns Bearer + token so replace bearer with nothing, to receive only the token
  const token = req.headers.authorization.replace('Bearer ', '');
  // asyncronous if called with a callback - called with decoded payload IF the signature is valid - if not called with the error
  // synchronous if no callback, same function
  return jwt.verifyAsync(token, secret)
  // find the user's subject in the payload
    .then(payload => User.findById(payload.sub))
    .then(user => {
      // if the user doesn't exist, Unauthorized status
      if(!user) return res.status(401).json({ message: 'Unauthorized' });
      // otherwise the current user on the request = user found
      req.currentUser = user;
      next();
    })
    .catch(next);
}

module.exports = secureRoute;
