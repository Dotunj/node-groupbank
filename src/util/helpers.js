const EventEmitter = require('events');

const to = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
};

const throwError = (message, errorCode) => {
  const error = new Error(message || "Default Error");
  error.statusCode = errorCode;
  throw error;
};

const sendError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

const myEmitter = () => {
  return new EventEmitter();
};


module.exports = {
  to,
  throwError,
  sendError,
  myEmitter
};
