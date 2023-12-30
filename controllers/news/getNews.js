const { News } = require('../../models/new');

const getNews = async (req, res) => {
  const { keyword = '', page = 1, limit = 6 } = req.query;
  const query = {};
  if (keyword) {
    query.$or = [{ title: { $regex: keyword, $options: 'i' } }, { text: { $regex: keyword, $options: 'i' } }];
  }
  const skip = (page - 1) * limit;

  const newsByQuery = await News.aggregate([
    { $match: query },
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        results: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
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
    totalPages: Math.ceil(newsByQuery[0].totalCount / limit) || 1,
    results: newsByQuery[0].results,
  });
};

module.exports = getNews;
