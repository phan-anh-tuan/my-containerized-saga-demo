function InvalidParrameterError(message) {
  Error.call(this, message);
  this.name = "InvalidParrameterError";
};

InvalidParrameterError.prototype = Object.create(Error.prototype);

Object.defineProperty(InvalidParrameterError.prototype, 'constructor', { 
  value: InvalidParrameterError, 
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });

module.exports = exports = InvalidParrameterError;