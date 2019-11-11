const ChargeAttemptFailedSlackNotification = require("../notifications/ChargeAttemptFailedSlackNotification");
const ChargeAttemptFailedMail = require("../mails/ChargeAttemptFailedMail");
const { ChargeAttempt } = require("../models");
const COMPLETED = "completed";

class ChargeAttemptFailedSubscriber {
  notifyViaSlack(chargeAttempt) {
    setImmediate(() => {
      const failedSlackNotification = new ChargeAttemptFailedSlackNotification(
        chargeAttempt
      );
      return failedSlackNotification.notify();
    });
  }

  notifyViaEmail(chargeAttempt) {
    setImmediate(() => {
      const failedMailNotification = new ChargeAttemptFailedMail(chargeAttempt);
      return failedMailNotification.sendMail();
    });
  }

  markAsCompleted(chargeAttempt) {
    setImmediate(() => {
      ChargeAttempt.findOne({ where: { uuid: chargeAttempt.uuid } })
        .then(chargeAttempt => {
          if (!chargeAttempt) return;
          chargeAttempt
            .update({ status: COMPLETED })
            .then(res => {
              return;
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }
}

module.exports = new ChargeAttemptFailedSubscriber();
