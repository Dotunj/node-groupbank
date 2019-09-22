const { listAllBanks, fetchAccountName } = require("../services/bankService");
const { throwError, sendError } = require("../util/helpers");
const { validationResult } = require("express-validator");
const SUCCESS = "00";

exports.listAllBanks = async (req, res, next) => {
  try {
    const {
      data: { data: banks }
    } = await listAllBanks();
    res.json(banks);
  } catch (err) {
    sendError(err, next);
  }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }
    const {
      recipient_account: recipientAccount,
      bank_code: bankCode
    } = req.body;
    const { data } = await fetchAccountName(recipientAccount, bankCode);
    const {
      responsecode: responseCode,
      accountname: accountName
    } = data.data.data;
    if (responseCode != SUCCESS)
      throwError("Please enter the correct details and try again");
    res.json(accountName);
  } catch (err) {
    sendError(err, next);
  }
};
