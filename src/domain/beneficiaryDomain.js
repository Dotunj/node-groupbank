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

const findBeneficiary = uuid => {
  return new Promise((resolve, reject) => {
    resolve(Beneficiary.findOne({ where: { uuid } }));
  });
};

const updateBeneficiary = ({
  userId,
  beneficiary,
  cardId,
  recipientAccount,
  bankCode,
  accountName
}) => {
  return new Promise((resolve, reject) => {
    resolve(
      beneficiary.update({
        userId,
        cardId,
        account_name: accountName,
        bank_code: bankCode,
        account_number: recipientAccount
      })
    );
  });
};

const deleteBeneficiary = beneficiary => {
  return new Promise((resolve, reject) => {
    resolve(beneficiary.destroy());
  });
};

module.exports = {
  storeBeneficiary,
  findBeneficiary,
  updateBeneficiary,
  deleteBeneficiary
};
