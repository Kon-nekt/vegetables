const nodeMailer = require('nodemailer');

module.exports = nodeMailer.createTransport({
        host: 'smtp-pulse.com',
        port: 2525,
        // secure: true,
        auth: {
            user: 'timchenkoandrey19@gmail.com',
            pass: 'KLdaaXEJKcN',
        },
    });
