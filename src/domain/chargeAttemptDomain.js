const { ChargeAttempt } = require("../models");

const createChargeAttempt = attributes => {
  return new Promise((resolve, reject) => {
    ChargeAttempt.create(attributes)
      .then(chargeAttempt => {
        resolve(chargeAttempt);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const findByUuid = uuid => {
  return new Promise((resolve, reject) => {
    ChargeAttempt.findOne({ where: { uuid } })
      .then(chargeAttempt => {
        if (!chargeAttempt) reject("Not found");
        resolve(chargeAttempt);
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  createChargeAttempt
};
