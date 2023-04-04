let nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transport = nodemailer.createTransport({
<<<<<<< Updated upstream
   host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        },
=======
    service: "outlook",
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
      user: "testingsit420@outlook.com",
      pass: "testing420sit#&d@",
    },
    tls: {
      ciphers: "SSLv3",
    },
>>>>>>> Stashed changes
  });

  let mailOptions = {
    from: "Task Manager MERN <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    // text: EmailText,
    html: `<html>
    <body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
      <h1 style="font-size: 32px; margin-bottom: 20px; text-align: center; color: blue">${EmailText}</h1>
      <p style="margin: 10px; font-size: 17px; text-align: center;">This is your OTP code. It's expire with 2 manet</p>      
    </body>
  </html>`,
  };

  return await transport.sendMail(mailOptions);
};



module.exports = SendEmailUtility;
