const { Types } = require('mongoose');
const { HttpError } = require('../../helpers');
const { Notice } = require('../../models/notice');
const { User } = require('../../models/user');
const ObjectId = Types.ObjectId;

const getNoticeById = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: userId, noticesViewed } = req.user;

  const updatedNotice = await Notice.findByIdAndUpdate(
    ObjectId.createFromHexString(noticeId),
    {
      $inc: { popularity: 1 },
    },
    { new: true },
  ).populate('location user', 'stateEn cityEn email phone');

  if (!updatedNotice) {
    throw HttpError(404, 'This notice is not found in notices');
  }

  if (userId && !noticesViewed.includes(noticeId)) {
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { noticesViewed: { $each: [noticeId], $position: 0 } },
      },
      { new: true },
    );
  }

  res.status(200).json(updatedNotice);
};

module.exports = getNoticeById;
