const nodemailer = require("nodemailer");

class Mailable {
  constructor() {
    this.nodemailer = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  send(options) {
    this.nodemailer.sendMail(options, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Message sent ${info.messageId}`);
    });
  }
}

module.exports = Mailable;