const { authenticatedUser } = require("../middleware/isAuth");
const { validationResult } = require("express-validator");
const { throwError, sendError } = require("../util/helpers");
const {
  createSchedule,
  findSchedule,
  updateSchedule,
  deleteSchedule
} = require("../domain/scheduleDomain");

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
    res
      .status(201)
      .json({ message: "Schedule has been created successfully", schedule });
  } catch (err) {
    sendError(err, next);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const schedule = await findSchedule(req.params.uuid);
    if (!schedule) throwError("Schedule does not exist", 404);
    if (schedule.userId != req.userId) throwError("Unauthorized", 403);
    res.json({ schedule });
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
    let schedule = await findSchedule(req.params.uuid);
    if (!schedule) throwError("Schedule does not exist", 404);
    if (schedule.userId != req.userId) throwError("Unauthorized", 403);
    const scheduleDetails = {
      schedule,
      userId: req.userId,
      cardId: req.body.card_id,
      beneficiaryId: req.body.beneficiary_id,
      amount: req.body.amount,
      chargeDate: req.body.charge_date,
      active: req.body.active
    };
    schedule = updateSchedule(scheduleDetails);
    res.json({ message: "Schedule has been updated successfully", schedule });
  } catch (err) {
    sendError(err, next);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const schedule = await findSchedule(req.params.uuid);
    if (!schedule) throwError("Schedule does not exist", 404);
    if (schedule.userId != req.userId) throwError("Unauthorized", 403);
    await deleteSchedule(schedule);
    res.json({ message: "schedule has been deleted successfully" });
  } catch (err) {
    sendError(err, next);
  }
};
