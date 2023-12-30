const currentUser = async (req, res) => {
  const { _id, name, email, token, noticesFavorites } = req.user;
  res.json({ _id, name, email, token, noticesFavorites });
};

module.exports = currentUser;
