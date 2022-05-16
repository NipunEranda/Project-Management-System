const nodemailer = require('nodemailer');
const config = require('./config');

//Function to send Mails
function sendEmail(req, subject, body) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPw
            },
        });

        let mailOptions = {
            from: config.emailUser,
            to: req.body.email,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, function (err, success) {
            if (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

//Exports list
module.exports = {
    sendEmail
};