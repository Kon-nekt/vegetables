const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');


const controller = require('../Controllers/vegController');
const authenticationMiddleware = require('../middleware/middleware');

const router = express.Router();

// router.use((req, res, next) => next());


router.use(bodyParser.json({
    extended: true,
    limit: '15mb',
    type: 'text/json',
}));

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/panel', authenticationMiddleware(), function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });

router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.use(express.static(path.join(__dirname, '../../build')));

router.post('/vegs', authenticationMiddleware(), (req, res) => {
    controller.addVeg(req, res);
});

router.get('/vegs', (req, res) => {
    controller.getVegs(req, res);
});

router.put('/vegs', authenticationMiddleware(), (req, res) => {
    controller.putVegs(req, res);
})

router.delete('/vegs:id', authenticationMiddleware(), (req, res) => {
    controller.delVegs(req, res);
})

router.get('/storage/*',  (req, res) => {
    controller.storage(req, res);
});

router.get('/isUser', authenticationMiddleware(), (req, res) => {
    return res.json({
        result: true,
    });
});

router.post('/login', async function(req, res) {
    try {
        const { username, password } = req.body;

        const findVeg = await mongodb.aggregate('user', [
            { $match: {
                login: username,
            } },
        ]);

        if (!findVeg.length)
           return res.status(401)

        bcrypt.compare(password, findVeg[0].password, (err, isValid) => {
            if (err) {
                return res.json({
                    result: false,
                    title: 'Аутентификация',
                    message: err,
                    time: Date.now(),
                });
            }
            if (!isValid) {
                return res.json({
                    result: false,
                    title: 'Аутентификация',
                    message: 'error',
                    time: Date.now(),
                });
            }
            const payload = { username };
            const token = jwt.sign(payload, 'secret', {
                expiresIn: '500h',
            });
            return res.cookie('token', token, { httpOnly: true })
            .json({
                result: true,
                title: 'Аутентификация',
                message: 'Успешно',
                time: Date.now(),
            });
        })
    } catch (error) {
        return res.json({
            result: false,
            title: 'Аутентификация',
            message: error,
            time: Date.now(),
        });
    }
});
// router.get('/logout', (req, res) => {
//     req.logOut();
//     return res.redirect('http://192.236.146.174');
// });

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//       if (err) {
//         console.log(err);
//         return res.json({
//             result: false,
//             title: 'Логин',
//             message: err.message,
//         });
//         }
//       if (!user) {
//             return res.json({
//             result: false,
//             title: 'Логин',
//             message: 'Неправильный e-mail или пароль.',
//         });
//         }
//       req.logIn(user, (err) => {
//             if (err) {
//                 return res.json({
//                     result: false,
//                     title: 'Логин',
//                     message: err.message,
//                 });
//              }
//              return res.json({
//                 result: true,
//                 title: 'Логин',
//                 q: user,
//                 message: 'Успешно',
//             });
//       });
//     })(req, res, next);
//   }, (req, res) => console.log(req));




module.exports = router;
