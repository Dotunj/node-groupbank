const axios = require("axios");

class Flutterwave {
  constructor() {
    this.baseURL = process.env.FLU_BASE_URL;
    this.secretKey = process.env.FLU_SECRET_KEY;
    this.publicKey = process.env.FLU_PUBLIC_KEY;
  }

  verifyTransaction(txnref) {
    return new Promise((resolve, reject) => {
      resolve(
        axios.post(this.baseURL + "verify", {
          txref: txnref,
          SECKEY: this.secretKey
        })
      );
    });
  }

  fetchAllBanks() {
    const url = `https://api.ravepay.co/v2/banks/NG?public_key=${this.publicKey}`;
    console.log(url);
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
}

module.exports = Flutterwave;
