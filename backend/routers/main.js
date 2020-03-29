const express = require('express');

const injector = require('../modules/injector');
const controller = require('../Controllers/vegController');

const router = express.Router();

// router.use((req, res, next) => next());

router.post('/vegetables',  (req, res) => {
    controller.addVeg(req, res);
});

module.exports = router;
