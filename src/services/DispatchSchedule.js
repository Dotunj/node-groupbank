const { allDueSchedules } = require("../domain/scheduleDomain");
const { createChargeAttempt } = require("../domain/chargeAttemptDomain");
const PENDING = "pending";
const crypto = require("crypto");
const Flutterwave = require("../services/Flutterwave");
const myEmitter = require("../util/eventEmitter");
const {
  CHARGEATTEMPTSUCCESSFUL,
  CHARGEATTEMPTFAILED
} = require("../events/eventTypes");

class DispatchSchedule {
  async chargeAllSchedulesDue() {
    const schedules = await allDueSchedules("2019-10-24");
    if (!schedules) return;
    schedules.forEach(async schedule => {
      const [card, user] = await Promise.all([
        schedule.getCard(),
        schedule.getUser()
      ]);
      const attributes = await this.getChargeAttemptAttributes(user, schedule);
      const chargeAttempt = await createChargeAttempt(attributes);
      const transactionAttributes = await this.getTransactionAttributes(
        chargeAttempt,
        user,
        card
      );
      const flutterwave = new Flutterwave();
      const { txRef } = await flutterwave.chargeCard(transactionAttributes);
      const wasTransactionSuccessful = await flutterwave.verifyTransaction(
        txRef
      );
      if (wasTransactionSuccessful) {
        return myEmitter.emit(CHARGEATTEMPTSUCCESSFUL, chargeAttempt);
      }
      return myEmitter.emit(CHARGEATTEMPTFAILED, chargeAttempt);
    });
  }

  async getChargeAttemptAttributes(user, schedule) {
    return {
      userId: user.id,
      txnref: crypto.randomBytes(5).toString("hex"),
      scheduleId: schedule.id,
      amount: schedule.amount,
      status: PENDING
    };
  }

  async getTransactionAttributes(chargeAttempt, user, card) {
    return {
      token: card.token,
      currency: "NGN",
      amount: chargeAttempt.amount,
      email: user.email,
      txRef: chargeAttempt.txnref
    };
  }
}

module.exports = new DispatchSchedule();

//fetch all the schedules due
//for each of them charge the card attached to it.
//if successful, send an email to say we've charged your card and then do a transfer to the beneficiary
//update the charge date
//if it fails, send an email to say charging your card failed

//on charging the users card, we can create two types of events [ChargeAttemptSuccessful and ChargeAttemptFailed]
//on charge attempt successful, we'll attach two listeners to that event. An email to say the charge attempt was successful
//and another to create a transfer_schedule.
