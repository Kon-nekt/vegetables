const bcrypt = require('bcrypt');

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash('CD5sno6L', salt, function(err, hash) {
       console.log(hash)
    });
});