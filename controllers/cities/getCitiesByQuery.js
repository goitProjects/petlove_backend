const Joi = require('joi');
const { City } = require('../../models/city');
const { HttpError } = require('../../helpers');

const keywordSchema = Joi.object({
  keyword: Joi.string().min(3).max(48).required(),
});

const getCitiesByQuery = async (req, res) => {
  const { error } = keywordSchema.validate(req.query);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { keyword } = req.query;
  const query = {};

  if (keyword) {
    query.$or = [
      // { stateEn: { $regex: keyword, $options: 'i' } },
      { cityEn: { $regex: keyword, $options: 'i' } },
    ];
  }

  const cities = await City.find(query);
  res.status(200).json(cities);
};

module.exports = getCitiesByQuery;
