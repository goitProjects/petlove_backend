const { Location } = require('../../models/location');

const getPetsLocations = async (_, res) => {
  const locations = await Location.find();
  res.json(locations);
};

module.exports = getPetsLocations;
