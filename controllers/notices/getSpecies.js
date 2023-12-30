const { Notice } = require('../../models/notice');

const getSpecies = async (req, res) => {
  const species = await Notice.distinct('species');
  res.json(species);
};

module.exports = getSpecies;