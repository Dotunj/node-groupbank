const ChargeAttemptSuccessSubscriber = require('../listeners/ChargeAttemptSuccessSubscriber')
const { CHARGEATTEMPTSUCCESSFUL, CHARGEATTEMPTFAILED } = require('./eventTypes')
const myEmitter = require('../util/eventEmitter');

//chargeAttemptSuccessful
myEmitter.on(CHARGEATTEMPTSUCCESSFUL, ChargeAttemptSuccessSubscriber.log);
myEmitter.on(CHARGEATTEMPTSUCCESSFUL, ChargeAttemptSuccessSubscriber.notifySlack);
myEmitter.on(CHARGEATTEMPTSUCCESSFUL, ChargeAttemptSuccessSubscriber.markAsCompleted);

//chargeAttemptFailed
myEmitter.on(CHARGEATTEMPTFAILED, ChargeAttemptSuccessSubscriber.markAsCompleted) 