const ChargeAttemptSuccessSlackNotification = require("../notifications/ChargeAttemptSuccessSlackNotification");
const { ChargeAttempt } = require("../models");
const COMPLETED = "completed";

class ChargeAttemptSuccessSubscriber {
  log(chargeAttempt) {
    setImmediate(() => {
      console.log(chargeAttempt.txnref);
    });
  }

  notifySlack(chargeAttempt) {
    const notification = new ChargeAttemptSuccessSlackNotification(
      chargeAttempt
    );
    notification.notify();
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
