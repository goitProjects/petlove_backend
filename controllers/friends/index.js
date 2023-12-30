const {  CtrlWrapper } = require('../../helpers');
const getFriends = require('./getFriends');

module.exports = {
  getFriends: CtrlWrapper(getFriends),
};
