const express = require('express');
const ctrl = require('../../controllers/cities');
const router = express.Router();


router.get('/', ctrl.getCitiesByQuery);


module.exports = router;
