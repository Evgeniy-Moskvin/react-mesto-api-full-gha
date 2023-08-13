const jwt = require('jsonwebtoken');
const UnAuthorized = require('../errors/UnAuthorized');
const { log } = require('winston');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  // const { authorization } = req.headers;
  //
  // if (!authorization.startsWith('Bearer')) {
  //   next(new UnAuthorized('Необходима авторизация!'));
  //   return;
  // }
  //
  // const token = authorization.split('Bearer ')[1];

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
