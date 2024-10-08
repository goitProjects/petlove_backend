const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { HttpError } = require('../helpers');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const foundUser = await User.findById(id).populate('noticesFavorites');
    if (!foundUser || !foundUser.token || foundUser.token !== token) {
      next(HttpError(401));
    }
    req.user = foundUser;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
