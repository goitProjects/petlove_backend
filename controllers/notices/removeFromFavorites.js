const { HttpError } = require('../../helpers');
const { Notice } = require('../../models/notice');
const { User } = require('../../models/user');

const removeFromFavorites = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: userId, noticesFavorites } = req.user;

  const foundNotice = await Notice.findById(noticeId);

  if (!foundNotice) {
    throw HttpError(404, 'This notice is not found in notices');
  }

  const isNoticeExisted = !!noticesFavorites.find((notice) => notice._id.toString() === noticeId);

  if (userId && isNoticeExisted) {
    const userInfo = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { noticesFavorites: noticeId },
      },
      { new: true },
    );
    res.status(200).json(userInfo.noticesFavorites);
  } else {
    throw HttpError(409, "This notice is not found in user's favorite notices");
  }
};

module.exports = removeFromFavorites;
