const { HttpError } = require('../../helpers');
const { Notice } = require('../../models/notice');
const { User } = require('../../models/user');

const addToFavorites = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: userId, noticesFavorites } = req.user;

  const foundNotice = await Notice.findById(noticeId);

  if (!foundNotice) {
 throw HttpError(404, "This notice is not found in notices");
  }

  const isNoticeExisted = !!noticesFavorites.find((notice) => notice._id.toString() === noticeId);
  
  if (userId && !isNoticeExisted) {
    const userInfo = await User.findByIdAndUpdate(
      userId,
      {
        $push: { noticesFavorites: { $each: [noticeId], $position: 0 } },
      },
      { new: true },
    );
    res.status(200).json(userInfo.noticesFavorites);
  } else {
    throw HttpError(409, "This notice has already added to user's favorite notices");
  }
};

module.exports = addToFavorites;
