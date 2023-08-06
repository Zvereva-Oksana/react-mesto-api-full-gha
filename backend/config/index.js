const rateLimit = require('express-rate-limit');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtSecret = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'secret';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  jwtSecret, limiter,
};
