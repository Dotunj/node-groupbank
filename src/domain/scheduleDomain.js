const { Schedule } = require("../models");

const createSchedule = ({}) => {
  return new Promise((resolve, reject) => {});
};

const findSchedule = uuid => {
  return new Promise((resolve, reject) => {
    resolve(Schedule.findOne({ where: { uuid } }));
  });
};

const updateSchedule = details => {
  return new Promise((resolve, reject) => {
    const schedule = details.schedule;
    resolve(
      schedule.update({
        userId: details.userId,
        cardId: details.cardId,
        beneficiaryId: details.beneficiaryId,
        amount: details.amount,
        chargeDate: details.chargeDate,
        active: details.active
      })
    );
  });
};

const deleteSchedule = schedule => {
  return new Promise((resolve, reject) => {
    resolve(schedule.destroy);
  });
};

module.exports = {
  createSchedule,
  findSchedule,
  updateSchedule,
  deleteSchedule
};
