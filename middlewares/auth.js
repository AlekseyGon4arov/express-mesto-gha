const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');
const { JWT_SECRET } = require('../utils/constans');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedErr('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedErr('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
