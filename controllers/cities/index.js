const { CtrlWrapper } = require('../../helpers');
const getCitiesByQuery = require('./getCitiesByQuery');
const setCurCities = require('./setCurCities');
const getPetsLocations = require('./getPetsLocations');

module.exports = {
  getCitiesByQuery: CtrlWrapper(getCitiesByQuery),
  setCurCities: CtrlWrapper(setCurCities),
  getPetsLocations: CtrlWrapper(getPetsLocations),
};
