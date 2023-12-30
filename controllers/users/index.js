const { CtrlWrapper } = require('../../helpers');
const signup = require('./signup');
const signin = require('./signin');
const currentUser = require('./currentUser');
const currentUserFull = require('./currentUserFull');
const updateUser = require('./updateUser');
const addPet = require('./addPet');
const removePet = require('./removePet');
const signout = require('./signout');

module.exports = {
  signup: CtrlWrapper(signup),
  signin: CtrlWrapper(signin),
  currentUser: CtrlWrapper(currentUser),
  currentUserFull: CtrlWrapper(currentUserFull),
  updateUser: CtrlWrapper(updateUser),
  addPet: CtrlWrapper(addPet),
  removePet: CtrlWrapper(removePet),
  signout: CtrlWrapper(signout),
};
