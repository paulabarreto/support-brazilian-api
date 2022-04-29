const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  exports.verifyNodeMailer = function (req, res, error) {
    transporter.verify(function(error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages");
        }
    });
  }

  exports.sendMail = function(req, res, err) {
    var email = process.env.RECIPIENT_EMAIL
    var subject = req.body.subject
    var message = req.body.message
  
    var mail = {
      to: email,
      subject: subject,
      text: message
    }
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            status: 'fail'
          })
        } else {
          res.json({
           status: 'success'
          })
        }
      })
  }
