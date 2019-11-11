const ChargeAttemptSuccessSlackNotification = require("../notifications/ChargeAttemptSuccessSlackNotification");
const ChargeAttemptSuccessMail = require("../mails/ChargeAttemptSuccessMail");
const { ChargeAttempt } = require("../models");
const COMPLETED = "completed";

class ChargeAttemptSuccessSubscriber {
  log(chargeAttempt) {
    setImmediate(() => {
      console.log(chargeAttempt.txnref);
    });
  }

  notifyViaSlack(chargeAttempt) {
    const notification = new ChargeAttemptSuccessSlackNotification(
      chargeAttempt
    );
    notification.notify();
  }

  notifyViaEmail(chargeAttempt) {
    setImmediate(() => {
      const chargeAttemptSuccessMail = new ChargeAttemptSuccessMail(
        chargeAttempt
      );
      return chargeAttemptSuccessMail.sendMail();
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

module.exports = new ChargeAttemptSuccessSubscriber();
