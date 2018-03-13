const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri: 'mongodb://localhost/mean-angular-2',
  secret: crypto,
  db: 'mean-angular-2'
};