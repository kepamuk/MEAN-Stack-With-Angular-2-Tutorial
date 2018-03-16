const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const UserModel = require('../models/user');

router.post('/registration', (req, res) => {

  const user = new UserModel(req.body);

  if (!req.body.username) {
    res.send({success: false, message: 'Name is required'});
  } else if (!req.body.email) {
    res.send({success: false, message: 'Email is required'});
  } else if (!req.body.password) {
    res.send({success: false, message: 'Password is required'});
  } else {

    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          res.send({success: false, message: 'Duplicate'});
        } else if (err.message) {
          res.send({success: false, message: err.message});
        } else {
          res.send({success: false, message: err});
        }
      } else {
        res.send({success: true, message: 'User saved'});
      }
    });
  }

});

router.get('/checkField/:value&:type', (req, res) => {
  let type = {};
  type[req.params.type] = req.params.value;

  UserModel.findOne(type,
    function (err, result) {
      if (err) return handleError(err);

      result ? res.send({success: false, message: `This ${req.params.type} already taken`}) : res.send({
        success: true,
        message: `This ${req.params.type} you can use`
      });
    });
});

router.get('/profile', verifyJwt, function (req, res) {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

router.post('/login', (req, res) => {
  if (!req.body.username) {
    res.send({success: false, message: 'Name is required'});
  } else {
    UserModel.findOne({username: req.body.username}, (request, user) => {
      const isMatch = user.comparePassword(req.body.password);
      if (isMatch) {
        const token = jwt.sign({user: user}, config.secret, {expiresIn: '24h'});
        res.send({success: true, message: 'Password true', token: token, user: user.username});
      } else {
        res.send({success: false, message: 'Passwords dont match'});
      }
    });
  }
});

function verifyJwt(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/test', (req, res) => {
  res.send({success: true, message: 'test'});
});

module.exports = router;