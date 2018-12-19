const UnrecoverableException = require('../exception/UnrecoverableException');

function buildResponse(statusCode, body, h) {
  return h.response(body)
          .code(statusCode)
          .type('application/json')
          .header('Access-Control-Allow-Origin','*')
          .header('Access-Control-Allow-Credentials', true);
}

module.exports = exports = {
  success: function(body, h) {
    return buildResponse(200, { result: body, success: true }, h);
  },
  failure: function(error, h) {
    //console.log('failure instanceof UnrecoverableException ', error instanceof UnrecoverableException)
    //console.log('failure error ', error)
    const body = { cause: error.message, success: false };
    return buildResponse(500, body, h);
  }
}
