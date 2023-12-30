const {  CtrlWrapper } = require('../../helpers');
const getCitiesByQuery = require('./getCitiesByQuery');

module.exports = {
  getCitiesByQuery: CtrlWrapper(getCitiesByQuery)
};
