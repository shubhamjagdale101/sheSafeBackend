const nodemailer = require("nodemailer")
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_ID_PASSWORD
    }
});

const mailOption = (emailId, subject, body) => {
    return {
        from: process.env.EMAIL_ID,
        to: emailId,
        subject: subject,
        text: body
    }
}

const sendMail = (emailId, subject, body) => {
    const mailOptionData = mailOption(emailId, subject, body);

    transporter.sendMail(mailOptionData, (err, info) => {
        if(err) next(err)
    })
}

module.exports = sendMail;