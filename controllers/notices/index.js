const {  CtrlWrapper } = require('../../helpers');
const getNotices = require('./getNotices');
const getCategories = require('./getCategories');
const getSex = require('./getSex');
const getSpecies = require('./getSpecies');
const getNoticeId = require('./getNoticeId');
const addToFavorites = require('./addToFavorites');
const removeFromFavorites = require('./removeFromFavorites');

module.exports = {
    getNotices: CtrlWrapper(getNotices),
    getCategories: CtrlWrapper(getCategories),
    getSex: CtrlWrapper(getSex),
    getSpecies: CtrlWrapper(getSpecies),
    getNoticeId: CtrlWrapper(getNoticeId),
    addToFavorites: CtrlWrapper(addToFavorites),
    removeFromFavorites: CtrlWrapper(removeFromFavorites),
};
