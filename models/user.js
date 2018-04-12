const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is required', unique: true },
  email: { type: String, required: 'Email is required', unique: true },
  password: { type: String, required: 'Password is required' },
  favourites: []
});

userSchema
// this is a virtual because the data is not being saved
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswords(next) {
  // invalidate password if the password and password confirmation do not match
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

// hashing the password so it is not saved as their password in my database
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

// compared unhashed password with the password the user has entered to see if it is correct
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
