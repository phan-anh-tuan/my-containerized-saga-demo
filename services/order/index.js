const validate = require('../../lib/validation');
const  { success, failure } = require('../../lib/response');
const { call } = require('../../lib/dynamodb');
const InvalidParrameterError = require('../../exception/InvalidParrameterException');
const UnrecoverableException = require('../../exception/UnrecoverableException');

function buildRequestParameter(orderDetails) {
  return Object.assign({}, { TableName: process.env.ORDERS_TABLE }, { Item : orderDetails} , {  ConditionExpression: 'attribute_not_exists(orderId) AND attribute_not_exists(version)' } );
}

async function main(data) {
  const orderDetail = {
    customerId: data.customerId,
    orderId: data.orderId,
    items: data.items,
    version: data.version, // this should be datetime ??
  };
  // validate input
  const { errors, value } = validate(orderDetail, 'order');
  if (errors) {
    console.log('validation errors', errors);
    // Exception Handling varies depend on event source
    // In case event source is step function (how to identify event source?), throw an exception so that step functions can deal with it
    throw new InvalidParrameterError('Invalid Order Details'.concat(errors.toString()));
  }
  
  const params = buildRequestParameter(value);
  console.log('DynamoDB called with: ',params)
  try {
    await call('put', params);
    return {};
  } catch (e) {
    // retry behaviour is handled by aws sdk so we don't have to worry about it.
    if (e.code === 'ConditionalCheckFailedException') {
        return {};
    } else {
      console.log('dynamodb put error: ',e);
      // TODO: return more comprehensive error to consumer
      throw new UnrecoverableException(e.message);  
    }
  }
}

module.exports.register = async function (server, options) {
    server.route({
        method: 'POST',
        path: '/orders',
        handler: async function (request, h) {
            // Request body is passed in as a JSON encoded string in 'event.body'
            console.log('Function arguments ', request.payload);
            let data = request.payload;
            try {
                const result = await main(data);
                return success(result, h);
            } catch(e) {
              return failure(e, h);
            }
        },
        options: {
            description: 'Place an order',
            notes: [],
            tags: ['api', 'orders']
        }
    });
}

module.exports.name = "order";
module.exports.version = "1.0"
