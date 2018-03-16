const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const lengthNameValidator = function (name) {
  return name.length >= 2 && name.length <= 10;
};

const nameValidator = function (name) {
  return /^[a-zA-Z0-9]+$/.test(name);
};


const lengthEmailValidator = function (email) {
  return email.length >= 5 && email.length <= 30;
};

const emailValidator = function (email) {
  return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
};


const passwordValidator = function (password) {
  return /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/.test(password);
};

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: [
      {
        validator: lengthNameValidator,
        message: 'Length must be more than 5 or less than 30'
      },
      {
        validator: nameValidator,
        message: 'Name not valid'
      }
    ]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: [
      {
        validator: lengthEmailValidator,
        message: 'Length must be more than 5 or less than 30'
      },
      {
        validator: emailValidator,
        message: 'Email not valid'
      }
    ]
  },
  password: {
    type: String,
    required: true,
    validate: [
      {
        validator: passwordValidator,
        message: 'Password should have 1 capital letter, 1 lowercase latter and 1 special symbol.'
      }
    ]
  }
});

UserSchema.pre('save', function (next) {

  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });

});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);