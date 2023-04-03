const jwt = require('jsonwebtoken');
const config = require('./config');

function generateToken(user) {
  const payload = {
    sub: user._id,
    name: user.name,
    email: user.email
  };
  const options = {
    expiresIn: config.jwt.expiresIn
  };
  return jwt.sign(payload, config.jwt.secret, options);
}

function verifyToken(token) {
  return jwt.verify(token, config.jwt.secret);
}

function getTokenFromHeaders(headers) {
  const authHeader = headers.authorization;
  if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
    return authHeader.split(' ')[1];
  }
  return null;
}

module.exports = {
  generateToken,
  verifyToken,
  getTokenFromHeaders
};
