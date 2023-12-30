const express = require('express');
const { validateId, authenticate} = require('../../middlewares');
const ctrl = require('../../controllers/notices');

const router = express.Router();

router.get('/', ctrl.getNotices);
router.get('/categories', ctrl.getCategories);
router.get('/sex', ctrl.getSex);
router.get('/species', ctrl.getSpecies);
router.post('/favorites/add/:id', authenticate, validateId, ctrl.addToFavorites);
router.delete('/favorites/remove/:id', authenticate, validateId, ctrl.removeFromFavorites);
router.get('/:id',  validateId, authenticate, ctrl.getNoticeId);

module.exports = router;
