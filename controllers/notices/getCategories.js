const { Notice } = require('../../models/notice');

const getCategories = async (req, res) => {
  const categories = await Notice.distinct('category');
  res.json(categories);
};

module.exports = getCategories;