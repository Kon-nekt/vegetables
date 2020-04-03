const jwt = require('jsonwebtoken');

function authenticationMiddleware () {
    return function(req, res, next) {
        const token = req.cookies.token;
        console.log(req.cookies);
        if (!token) {
            res.redirect('/')
        } else {
          jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
              res.json({err})
            } else {
              req.username = decoded.username;
              next();
            }
          });
        }
      }
  }

module.exports = authenticationMiddleware