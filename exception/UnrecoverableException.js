var util = require('util');

function UnrecoverableException(message) {
  this.message = message;
  Error.captureStackTrace(this, UnrecoverableException);
}

util.inherits(UnrecoverableException, Error);

UnrecoverableException.prototype.name = 'UnrecoverableException'

/*
function UnrecoverableException(message) {
  var tmp = Error.apply(this, arguments)
  tmp.name = this.name = 'UnrecoverableException'

  this.message = tmp.message
  
  Object.defineProperty(this, 'stack', {
      get: function () {
          return tmp.stack
      }
  })
  return this
};

UnrecoverableException.prototype = Object.create(Error.prototype)
*/
module.exports = exports = UnrecoverableException;