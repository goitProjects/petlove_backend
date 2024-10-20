const { CtrlWrapper } = require('../../helpers');
const getCitiesByQuery = require('./getCitiesByQuery');
const getPetsLocations = require('./getPetsLocations');

module.exports = {
  getCitiesByQuery: CtrlWrapper(getCitiesByQuery),
  getPetsLocations: CtrlWrapper(getPetsLocations),
};
