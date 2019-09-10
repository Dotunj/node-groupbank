const { throwError, sendError } = require("../util/helpers");
const { validationResult } = require("express-validator");
const { verifyCardTransaction, storeCard } = require("../services/cardService");
const SUCCESS = "success";

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
      data: {
        data: { card: cardDetails }
      },
      data: { status }
    } = await verifyCardTransaction(req.body.txnref, req);
    if (status !== SUCCESS) throwError("Payment Failed", 401);
    const card = await storeCard(cardDetails);
    res.json({ message: "card has been added successfully", card });
  } catch (err) {
    sendError(err, next);
  }
};

exports.delete = (req, res, next) => {};
