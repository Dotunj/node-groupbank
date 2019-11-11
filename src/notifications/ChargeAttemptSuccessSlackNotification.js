const slackWebhookUrl =
  "https://hooks.slack.com/services/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";
const slack = require("slack-notify")(slackWebhookUrl);

class ChargeAttemptSuccessSlackNotification {
  constructor(chargeAttempt) {
    this.chargeAttempt = chargeAttempt;
  }
  notify() {
    slack.alert({
      text: "A successful Charge Attempt just occured on GroupBank",
      fields: {
        amount: `N ${this.chargeAttempt.amount}`
      }
    });
  }
}

module.exports = ChargeAttemptSuccessSlackNotification;
