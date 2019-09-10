const axios = require("axios");

class Flutterwave {
  constructor() {
    this.baseURL = process.env.FLU_BASE_URL;
    this.secretKey = process.env.FLU_SECRET_KEY;
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
}

module.exports = Flutterwave;
