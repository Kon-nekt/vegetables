const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const controller = require('../Controllers/vegController');
const authenticationMiddleware = require('../middleware/middleware');

const router = express.Router();

// router.use((req, res, next) => next());


router.use(bodyParser.json({
    extended: true,
    limit: '15mb',
    type: 'text/json',
}));


router.post('/vegs', authenticationMiddleware(), (req, res) => {
    controller.addVeg(req, res);
});

router.get('/vegs', (req, res) => {
    console.log('AAAAAAAAAAAAAAAAAAAAA1');
    controller.getVegs(req, res);
});

router.put('/vegs', authenticationMiddleware(), (req, res) => {
    controller.putVegs(req, res);
})

router.delete('/vegs:id', authenticationMiddleware(), (req, res) => {
    controller.delVegs(req, res);
})

router.get('/storage/*',  (req, res) => {
    console.log('AAAAAAAAAAAAAAAAAAAAA');
    controller.storage(req, res);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
}))




module.exports = router;
