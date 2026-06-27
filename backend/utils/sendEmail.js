const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  try {
    console.log(process.env.EMAIL)
    console.log(process.env.EMAIL_PASS)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: process.env.EMAILL,
      to,
      subject,
      text
    });

    console.log("email sent");
  }
  catch (error) {
    console.log("email error", error.message);
  }
}

module.exports = sendEmail;