const Flutterwave = require("../services/Flutterwave");

const listAllBanks = () => {
  const flutterwave = new Flutterwave();
  return new Promise((resolve, reject) => {
    resolve(flutterwave.fetchAllBanks());
  });
};

const fetchAccountName = (recipientAccount, bankCode) => {
  const flutterwave = new Flutterwave();
  return new Promise((resolve, reject) => {
    resolve(flutterwave.fetchAccountName(recipientAccount, bankCode));
  });
};

module.exports = {
  listAllBanks,
  fetchAccountName
};
