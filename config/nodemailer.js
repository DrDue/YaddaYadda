const nodemailer = require('nodemailer');
const config  = require('../config/config');
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

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    transporter.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your Yadda account",
      html: `<h4>Hello ${name}.</h4>
          <p>Thank you for creating a user on our Yadda social media.</p> 
          <p>Please confirm your email by clicking on the following link to be able to login to your account.</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Confirm your email adress</a>
          <br>
          <p>Best regards</p>
          <p>Yadda M, C, K</p>
          </div>`,
    }).catch(err => console.log(err));
  };


  // // Step 2
// let mailOptions = {
//     from: 'yaddamck@gmail.com',
//     to: 'christiankrushave@gmail.com',
//     subject: 'Please confirm your account',
//     html: 
//     `<h1>Email Confirmation</h1>
//      <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
//      <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a> 
//     `
// };

// // Step 3

// transporter.sendMail(mailOptions, function(err, data) {
//     if (err) {
//         console.log('Error happened');
//     } else {
//         console.log('Email has been sent!');
//     }
// });