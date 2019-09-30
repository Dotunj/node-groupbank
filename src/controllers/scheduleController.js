const { authenticatedUser } = require("../middleware/isAuth");
const { validationResult } = require("express-validator");
const { throwError, sendError } = require("../util/helpers");
const { createSchedule } = require("../services/scheduleService");

exports.list = async (req, res, next) => {
  try {
    const user = await authenticatedUser(req.userId);
    const [cards, beneficiaries] = await Promise.all([
      user.getCards(),
      user.getBeneficiaries()
    ]);
    res.json({ cards, beneficiaries });
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
    const scheduleDetails = {
      userId: req.userId,
      cardId: req.body.card_id,
      beneficiaryId: req.body.beneficiary_id,
      amount: req.body.amount,
      chargeDate: req.body.charge_date,
      active: req.body.active
    };
    const schedule = await createSchedule(scheduleDetails);
    res.json(201, { schedule });
  } catch (err) {
    sendError(err, next);
  }
};
