const { Notice } = require('../../models/notice');
const sexList = require('../../data/sex');

const getNotices = async (req, res) => {
  const { keyword = '', category = '', species = '', locationId = '', byDate = true, byPrice, byPopularity, page = 1, limit = 6, sex = '' } = req.query;

  const query = {};

  if (keyword) {
    query.$or = [{ species: { $regex: keyword, $options: 'i' } }, { title: { $regex: keyword, $options: 'i' } }];
  }
  category && (query.category = category);
  species && (query.species = species);
  locationId && (query.location = locationId);

  let sortOptions = { createdAt: JSON.parse(byDate) ? 1 : -1 };
  if (byPrice !== undefined) {
    sortOptions = { price: JSON.parse(byPrice) ? 1 : -1 };
    if (category && category !== 'sell') {
      query.category = category;
    } else {
      query.category = 'sell';
    }
  }
  if (byPopularity !== undefined) {
    sortOptions = { popularity: JSON.parse(byPopularity) ? 1 : -1 };
  }

  if (sexList.includes(sex)) {
    query.sex = sex;
  }

  const skip = (page - 1) * limit;

  const noticesByQuery = await Notice.aggregate([
    { $match: query },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        results: [{ ...(sortOptions && { $sort: sortOptions }) }, { $skip: Number(skip) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
        page: page,
        perPage: limit,
        results: 1,
      },
    },
  ]);

  res.json({
    page: Number(page),
    perPage: Number(limit),
    totalPages: Math.ceil(noticesByQuery[0].totalCount / limit) || 1,
    results: noticesByQuery[0].results,
  });
};

module.exports = getNotices;
