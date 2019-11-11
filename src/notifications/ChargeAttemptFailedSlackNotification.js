const slackWebhookUrl =
  "https://hooks.slack.com/services/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";
const slack = require("slack-notify")(slackWebhookUrl);

class ChargeAttemptFailedSlackNotification {
  constructor(chargeAttempt) {
    this.chargeAttempt = chargeAttempt;
  }
  notify() {
    slack.alert({
      text: "A Charge Attempt just failed on GroupBank",
      fields: {
        Amount: `N ${this.chargeAttempt.amount}`
      }
    });
  }
}

module.exports = ChargeAttemptFailedSlackNotification;
