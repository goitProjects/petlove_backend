const { Notice } = require('../../models/notice');

const getSex = async (req, res) => {
  const sex= await Notice.distinct('sex');
  res.json(sex);
};

module.exports = getSex;