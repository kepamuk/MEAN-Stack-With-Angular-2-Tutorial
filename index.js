const express = require('express');
const app = express();
const config = require('./config/database');
const path = require('path');
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT conntect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
