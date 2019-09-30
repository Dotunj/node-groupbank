const { listAllBanks, fetchAccountName } = require("../services/bankService");
const { throwError, sendError } = require("../util/helpers");
const { validationResult } = require("express-validator");
const { authenticatedUser } = require("../middleware/isAuth");
const {
  storeBeneficiary,
  findBeneficiary,
  updateBeneficiary,
  deleteBeneficiary
} = require("../services/beneficiaryService");
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

exports.index = async (req, res, next) => {
  try {
    const user = await authenticatedUser(req.userId);
    const beneficiaries = await user.getBeneficiaries();
    res.json(beneficiaries);
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
      bank_code: bankCode,
      card_id: cardId
    } = req.body;
    const { data } = await fetchAccountName(recipientAccount, bankCode);
    const {
      responsecode: responseCode,
      accountname: accountName
    } = data.data.data;
    if (responseCode != SUCCESS)
      throwError("Please enter the correct details and try again");
    const details = {
      userId: req.userId,
      cardId,
      recipientAccount,
      bankCode,
      accountName
    };
    const beneficiary = await storeBeneficiary(details);
    res.json({
      message: "beneficiary has been added successfully",
      beneficiary
    });
  } catch (err) {
    sendError(err, next);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const beneficiary = await findBeneficiary(req.params.uuid);
    if (!beneficiary) throwError("Beneficiary does not exist", 404);
    if (beneficiary.userId != req.userId) throwError("Unauthorized", 403);
    res.json({ beneficiaries });
  } catch (err) {
    sendError(err, next);
  }
};

exports.update = async (req, res, next) => {
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
      bank_code: bankCode,
      card_id: cardId
    } = req.body;
    let beneficiary = await findBeneficiary(req.params.uuid);
    if (!beneficiary) throwError("Not found", 404);
    if (beneficiary.userId != req.userId) throwError("Unauthorized", 403);
    const { data } = await fetchAccountName(recipientAccount, bankCode);
    const {
      responsecode: responseCode,
      accountname: accountName
    } = data.data.data;
    if (responseCode != SUCCESS)
      throwError("Please enter the correct details and try again");
    const details = {
      userId: req.userId,
      beneficiary,
      cardId,
      recipientAccount,
      bankCode,
      accountName
    };
    beneficiary = await updateBeneficiary(details);
    res.json({
      message: "beneficiary has been updated successfully",
      beneficiary
    });
  } catch (err) {
    sendError(err, next);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const beneficiary = await findBeneficiary(req.params.uuid);
    if (!beneficiary) throwError("Beneficiary does not exist", 404);
    if (beneficiary.userId != req.userId) throwError("Unauthorized", 403);
    await deleteBeneficiary(beneficiary);
    res.json({ message: "beneficiary has been deleted succesfully" });
  } catch (err) {
    sendError(err, next);
  }
};
