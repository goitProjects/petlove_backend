const { City } = require('../../models/city');

const getCitiesByQuery = async (req, res) => {
  const { keyword } = req.query;
  const query = {};

  if (keyword) {
    query.$or = [
      { stateEn: { $regex: keyword, $options: 'i' } },
      { cityEn: { $regex: keyword, $options: 'i' } }
    ];
  }

  const cities = await City.find(query);
  res.status(200).json(cities);
 
};

module.exports = getCitiesByQuery;
