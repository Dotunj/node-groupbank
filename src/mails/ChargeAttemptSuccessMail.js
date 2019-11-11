const Mailable = require("./Mailable");

class ChargeAttemptSuccessMail extends Mailable {
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
      subject: "Charge Attempt Successful",
      text: "Hello, a charge attempt was just successful on your card",
      html: `<b>Hey there! </b><br>Hello there, we just charged your card the sum of N ${this.chargeAttempt.amount}<br/>`
    };
  }
}

module.exports = ChargeAttemptSuccessMail;
