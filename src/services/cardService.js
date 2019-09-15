const Flutterwave = require("./Flutterwave");
const { Card } = require("../models");

const verifyCardTransaction = txnref => {
  return new Promise((resolve, reject) => {
    const flutterwave = new Flutterwave();
    resolve(flutterwave.verifyTransaction(txnref));
  });
};

const storeCard = (cardDetails, userId) => {
  return new Promise((resolve, reject) => {
    resolve(
      Card.create({
        userId,
        last_four: cardDetails.last4digits,
        expiry_month: cardDetails.expirymonth,
        expiry_year: cardDetails.expiryyear,
        token: cardDetails.card_tokens[0].embedtoken
      })
    );
  });
};

const deleteCard = card => {
  return new Promise((resolve, reject) => {
    resolve(card.destroy());
  });
};

module.exports = {
  verifyCardTransaction,
  storeCard,
  deleteCard
};
