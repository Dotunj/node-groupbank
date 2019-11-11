const ChargeAttemptSuccessSubscriber = require('../listeners/ChargeAttemptSuccessSubscriber');
const ChargeAttemptFailedSubscriber = require('../listeners/ChargeAttemptFailedSubscriber');
const { CHARGEATTEMPTSUCCESSFUL, CHARGEATTEMPTFAILED } = require('./eventTypes')
const myEmitter = require('../util/eventEmitter');

//chargeAttemptSuccessful
myEmitter.on(CHARGEATTEMPTSUCCESSFUL, ChargeAttemptSuccessSubscriber.log);
myEmitter.on(CHARGEATTEMPTSUCCESSFUL, ChargeAttemptSuccessSubscriber.notifyViaSlack);
myEmitter.on(CHARGEATTEMPTSUCCESSFUL, ChargeAttemptSuccessSubscriber.notifyViaEmail);
myEmitter.on(CHARGEATTEMPTSUCCESSFUL, ChargeAttemptSuccessSubscriber.markAsCompleted);

//chargeAttemptFailed
myEmitter.on(CHARGEATTEMPTFAILED, ChargeAttemptFailedSubscriber.notifyViaSlack); 
myEmitter.on(CHARGEATTEMPTFAILED, ChargeAttemptFailedSubscriber.notifyViaEmail); 
myEmitter.on(CHARGEATTEMPTFAILED, ChargeAttemptFailedSubscriber.markAsCompleted); 