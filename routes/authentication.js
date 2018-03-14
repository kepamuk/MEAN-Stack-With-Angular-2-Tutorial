const express = require('express');
const router = express.Router();

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

      result ? res.send({success: false, message: `This ${req.params.type} already taken`}) : res.send({success: true, message: `This ${req.params.type} you can use`});
    });
});

router.get('/test', function (req, res) {
  res.send({success: true, message: 'test'});
});

module.exports = router;