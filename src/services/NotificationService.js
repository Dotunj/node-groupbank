const slackWebhookUrl = 'https://hooks.slack.com/services/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';
const slack = require('slack-notify')(slackWebhookUrl);

class NotificationService {
    notify(message){
        slack.success(message);
    }
}

module.exports = new NotificationService();