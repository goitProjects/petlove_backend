const {  CtrlWrapper } = require('../../helpers');
const getNews = require('./getNews');

module.exports = {
  getNews: CtrlWrapper(getNews),
};
