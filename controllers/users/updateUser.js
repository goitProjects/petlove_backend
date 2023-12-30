const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const updateUser = async (req, res) => {
  const { email } = req.body;
  const { _id: userId } = req.user;

  const foundUser = await User.findOne({ email, _id: { $ne: userId } });
  if (foundUser) {
    throw HttpError(409, 'User with such an email is already exist');
  }

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, select: '-password' })
    .populate('noticesViewed noticesFavorites')
    .populate('pets', '-owner');
  res.status(200).json(updatedUser);
};

module.exports = updateUser;
