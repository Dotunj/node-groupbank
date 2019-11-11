const { Schedule } = require("../models");

const createSchedule = attributes => {
  return new Promise((resolve, reject) => {
    resolve(
      Schedule.create({
        userId: attributes.userId,
        cardId: attributes.cardId,
        beneficiaryId: attributes.beneficiaryId,
        amount: attributes.amount,
        charge_date: attributes.chargeDate,
        active: attributes.active
      })
    );
  });
};

const findSchedule = uuid => {
  return new Promise((resolve, reject) => {
    resolve(Schedule.findOne({ where: { uuid } }));
  });
};

const updateSchedule = attributes => {
  return new Promise((resolve, reject) => {
    const schedule = attributes.schedule;
    resolve(
      schedule.update({
        userId: attributes.userId,
        cardId: attributes.cardId,
        beneficiaryId: attributes.beneficiaryId,
        amount: attributes.amount,
        chargeDate: attributes.chargeDate,
        active: attributes.active
      })
    );
  });
};

const deleteSchedule = schedule => {
  return new Promise((resolve, reject) => {
    resolve(schedule.destroy());
  });
};

const allDueSchedules = date => {
  return new Promise((resolve, reject) => {
    resolve(
      Schedule.findAll({
        where: {
          charge_date: date,
          active: true
        }
      })
    );
  });
};

module.exports = {
  createSchedule,
  findSchedule,
  updateSchedule,
  deleteSchedule,
  allDueSchedules
};
