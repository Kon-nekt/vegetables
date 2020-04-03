const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const findVeg = await mongodb.aggregate('user', [
                { $match: {
                    login: username,
                } },
            ]);

            if (!findVeg.length)
                return done(null, false);

            bcrypt.compare(password, findVeg[0].password, (err, isValid) => {
                console.log(isValid);
                if (err) {
                    return done(err)
                }
                if (!isValid) {
                    return done(null, false)
                }
                return done(null, findVeg[0])
            })

        } catch (error) {
            return done(error);
        }
    }
))