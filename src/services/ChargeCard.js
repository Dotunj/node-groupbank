const Flutterwave = require("./Flutterwave");

class ChargeCard {
  debitCard(attributes) {
    return new Promise((resolve, reject) => {
      const flutterwave = new Flutterwave();
      resolve(flutterwave.chargeCard(attributes));
    });
  }
}

module.exports = new ChargeCard;
