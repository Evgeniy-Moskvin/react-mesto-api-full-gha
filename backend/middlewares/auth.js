const jwt = require('jsonwebtoken');
const UnAuthorized = require('../errors/UnAuthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  if (!token) {
    next(new UnAuthorized('Необходима авторизация!'));
    return;
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnAuthorized('Необходима авторизация!'));
    return;
  }

  res.user = payload;

  next();
};
module.exports = {
  auth,
};
