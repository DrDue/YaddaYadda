const nodemailer = require('nodemailer');
const config  = require('../../config/config');


const user = config.user;
const pass = config.pass;
// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass,
    }
});

// Step 2
let mailOptions = {
    from: 'yaddamck@gmail.com',
    to: 'christiankrushave@gmail.com',
    subject: 'Testing nodemailer sending',
    text: 'Christian er dum og træls og det er ikke fake news! - Citat: Morten Due, 2021'
};

// Step 3
transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
        console.log('Error happened');
    } else {
        console.log('Email has been sent!');
    }
});