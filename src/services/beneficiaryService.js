const { Beneficiary } = require("../models");

const storeBeneficiary = ({
  userId,
  cardId,
  recipientAccount,
  bankCode,
  accountName
}) => {
  return new Promise((resolve, reject) => {
    resolve(
      Beneficiary.create({
        userId,
        cardId,
        account_name: accountName,
        bank_code: bankCode,
        account_number: recipientAccount
      })
    );
  });
};

const findBeneficiary = (uuid) => {
  return new Promise((resolve, reject) => {
    resolve(beneficiary.findOne({ where: { uuid }}))
  })
}

const deleteBeneficiary = beneficiary => {
  return new Promise((resolve, reject) => {
    resolve(beneficiary.destroy());
  });
};

module.exports = {
  storeBeneficiary,
  findBeneficiary,
  deleteBeneficiary
};
