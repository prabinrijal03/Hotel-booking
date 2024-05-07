const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "prabinrijal7733@gmail.com",
        pass: "wnutynazocdbveus",
      },
      debug: true,
    });

    const mailOptions = {
      from: "PRABIN<prabinrijal03@gmail.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
};
module.exports = sendEmail;
