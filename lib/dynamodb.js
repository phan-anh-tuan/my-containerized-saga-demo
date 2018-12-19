const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-southeast-2' });

const IS_OFFLINE = process.env.IS_OFFLINE;
const LOCAL_DYNAMODB_ENDPOINT = process.env.LOCAL_DYNAMODB_ENDPOINT;

let dynamoDb;
if (IS_OFFLINE === 'true') {
  AWS.config.update({
    // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
    // endpoint: 'http://localhost:8000',
    accessKeyId: 'accessKeyId',
    secretAccessKey:'secretAccessKey',
    endpoint: LOCAL_DYNAMODB_ENDPOINT
  });
} 
dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = exports = {
  call: function(action, params) {
    return dynamoDb[action](params).promise();
  } 
}
 