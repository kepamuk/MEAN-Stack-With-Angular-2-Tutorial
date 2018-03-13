const express = require('express');
const router = express.Router();

const UserModel = require('../models/user');

router.post('/registration', function (req, res) {

  // console.log(req.body);


  const user = new UserModel(req.body);

  if (!req.body.name) {
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
        } else if(err.message) {
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

module.exports = router;