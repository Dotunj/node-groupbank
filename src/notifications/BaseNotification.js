const slackWebhookUrl = 'https://hooks.slack.com/services/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';
const slack = require('slack-notify')(slackWebhookUrl);

class BaseNotification {
    constructor(item){
        this.item = item;
        this.slack = slack;
    }
}

module.exports = new BaseNotification();
