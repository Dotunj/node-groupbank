const axios = require("axios");
const currency = "NGN";
const SUCCESS = "successful";
const SUCCESSCODE = "00";

class Flutterwave {
  constructor() {
    this.baseURL = process.env.FLU_BASE_URL;
    this.secretKey = process.env.FLU_SECRET_KEY;
    this.publicKey = process.env.FLU_PUBLIC_KEY;
  }

  verifyTransaction(txref) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseURL}/verify`, {
          SECKEY: this.secretKey,
          txref
        })
        .then(res => {
          return resolve(this.isTransactionSuccessful(res.data.data));
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  }

  isTransactionSuccessful({ status, chargecode }) {
    if (status == SUCCESS && chargecode == SUCCESSCODE) return true;
    return false;
  }

  fetchAllBanks() {
    const url = `https://api.ravepay.co/v2/banks/NG?public_key=${this.publicKey}`;
    return new Promise((resolve, reject) => {
      resolve(axios.get(url));
    });
  }

  fetchAccountName(recipientAccount, bankCode) {
    const url = "https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account";
    return new Promise((resolve, reject) => {
      resolve(
        axios.post(url, {
          recipientaccount: recipientAccount,
          destbankcode: bankCode,
          PBFPubKey: this.publicKey
        })
      );
    });
  }

  chargeCard(attributes) {
    const url =
      "https://api.ravepay.co/flwv3-pug/getpaidx/api/tokenized/charge";
    attributes = Object.assign(attributes, {
      SECKEY: this.secretKey
    });
    console.log(attributes);
    return new Promise((resolve, reject) => {
      axios
        .post(url, attributes)
        .then(res => {
          console.log(res.data.data);
          resolve(res.data.data);
        })
        .catch(err => {
          //console.log(err)
          reject(err);
        });
    });
  }
}

module.exports = Flutterwave;
