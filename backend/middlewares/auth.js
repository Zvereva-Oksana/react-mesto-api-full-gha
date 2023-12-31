const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { jwtSecret } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация.');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      jwtSecret,
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }
  req.user = payload;
  return next();
};
