const express = require('express');
const app = express();
const config = require('./config/database');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;

const auth = require('./routes/authentication');

mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT conntect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', auth);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
