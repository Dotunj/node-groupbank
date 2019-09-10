const Flutterwave = require("./Flutterwave");
const { throwError, sendError } = require("../util/helpers");
const SUCCESS = "success";
const { Card } = require('../models')

const verifyCardTransaction = (txnref, req) => {
  return new Promise((resolve, reject) => {
    const flutterwave = new Flutterwave();
    resolve(flutterwave.verifyTransaction(txnref));
  });
};

const storeCard = (cardDetails) => {
  return new Promise((resolve, reject) => {
    resolve(Card.create({
      last_four: cardDetails.last4digits
    }))
  });
};

const createCard = (txnref, req) => {
  verifyCardTransaction(txnref, req).then((result) => {
    return storeCard(result, req);
  }).catch((err) => {
    console.log(err)
  })
} 

module.exports = {
  verifyCardTransaction,
  storeCard
};
