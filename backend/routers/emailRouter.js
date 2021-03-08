import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


const emailRouter = express.Router();

dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD 
  }
});
// verifying the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

emailRouter.post('/', expressAsyncHandler(async (req, res) => {
var mailOptions = {
    from: 'shayana803@gmail.com', 
    to: req.body.receiver, 
    subject: 'Test Email',
    text: req.body.message
}

transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log('Error Occured==>',err);
    } else {
        console.log("Email Sent");
        res.send('Email Sent');
    }
})

}));

export default emailRouter;