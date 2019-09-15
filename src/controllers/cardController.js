const { throwError, sendError } = require("../util/helpers");
const { validationResult } = require("express-validator");
const {
  verifyCardTransaction,
  storeCard,
  deleteCard
} = require("../services/cardService");
const { Card } = require("../models");
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
    const { txnref } = req.body;
    const {
      data: {
        data: { card: cardDetails }
      },
      data: { status }
    } = await verifyCardTransaction(txnref);
    if (status !== SUCCESS) throwError("Payment Failed", 401);
    const card = await storeCard(cardDetails, req.userId);
    res.json({ message: "card has been added successfully", card });
  } catch (err) {
    sendError(err, next);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let uuid = req.params.uuid;
    const card = await Card.findOne({ where: { uuid } });
    if (!card) throwError("Card does not exist", 404);
    if (card.userId != req.userId) throwError("Unauthorized", 403);
    await deleteCard(card);
    res.json({ message: "Card has been deleted successfully" });
  } catch (err) {
    sendError(err, next);
  }
};
