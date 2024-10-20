const express = require('express');
const ctrl = require('../../controllers/cities');
const router = express.Router();

router.get('/', ctrl.getCitiesByQuery);
router.get('/locations', ctrl.getPetsLocations);

module.exports = router;
