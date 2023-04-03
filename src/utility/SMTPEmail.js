let nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transport = nodemailer.createTransport("SMTP", {
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
  });

  let mailOptions = {
    from: "Task Manager MERN <testingsit420@outlook.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transport.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
