const Mailable = require("./Mailable");

class ChargeAttemptFailedMail extends Mailable {
  constructor(chargeAttempt) {
    super();
    this.chargeAttempt = chargeAttempt;
  }

  async sendMail() {
    const mailOptions = await this.buildMailOption();
    return super.send(mailOptions);
  }

  async buildMailOption() {
    return {
      from: '"Groupbank" <info@groupbank>',
      to: "user1@example.com",
      subject: "Charge Attempt Failed",
      text: "Hello, a charge attempt just failed on your card",
      html: `<b>Hey there! </b><br>Hello there, we just charged your card the sum of N ${this.chargeAttempt.amount}<br/>`
    };
  }
}

module.exports = ChargeAttemptFailedMail;
