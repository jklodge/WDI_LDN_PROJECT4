const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  // create a user through the body of the request being made
  User.create(req.body)
    .then(user => {
      // create a token for this user using jwt.sign
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      // send the user, token, and a message in the response
      res.json({ user, token, message: 'Thank you for registering' });
    })
    .catch(next);
}

function login(req, res, next) {
  // find user by email address through the email in the body of the request
  User.findOne({ email: req.body.email })
    .then(user => {
      // if the user does not exist, or the password is not validated, return status 401 - unauthorised
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' });
      }

      // create token in localStorage, and send the user, token, and message saying welcome back
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: `Welcome back ${user.username}!` });
    })
    .catch(next);
}

function createRecipeFavouriteRoute(req, res, next) {
  req.currentUser.favourites.push(req.body);

  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}

function deleteRecipeFavouriteRoute(req, res, next) {
  return User.findById(req.currentUser._id)
    .then(user => {
      user.favourites = user.favourites.filter(favourite => !favourite.equals(req.params.id));
      return user.save();
    })
    .then(user => res.status(201).json(user))
    .catch(next);
}

function me(req, res) {
  return res.json(req.currentUser);
}

module.exports = {
  register,
  login,
  me,
  createRecipeFavouriteRoute,
  deleteRecipeFavouriteRoute
};
