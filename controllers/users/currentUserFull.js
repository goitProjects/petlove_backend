const { User } = require('../../models/user');

const currentUserFull = async (req, res) => {
  const { _id } = req.user;
  const foundUser = await User.findById(_id).populate('noticesViewed noticesFavorites').populate('pets', '-owner');
  const { password, ...user } = foundUser.toObject();
  res.json(user);
};

module.exports = currentUserFull;
