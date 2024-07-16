const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
  let response;
  switch (event.httpMethod) {
    case 'GET':
      if (event.pathParameters && event.pathParameters.proxy) {
        response = await getItem(event);
      } else {
        response = await getAllItems(event);
      }
      break;
    case 'POST':
      response = await createItem(event);
      break;
    case 'PUT':
      response = await updateItem(event);
      break;
    case 'DELETE':
      response = await deleteItem(event);
      break;
    default:
      response = buildResponse(405, 'Method Not Allowed');
  }
  return response;
};

const getItem = async (event) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: event.pathParameters.proxy
    }
  };
  const result = await dynamo.get(params).promise();
  return buildResponse(200, result.Item);
};

const getAllItems = async (event) => {
  const params = {
    TableName: TABLE_NAME
  };
  const result = await dynamo.scan(params).promise();
  return buildResponse(200, result.Items);
};

const createItem = async (event) => {
  const body = JSON.parse(event.body);
  const itemId = uuidv4(); // Generar un UUID único
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: itemId, // Usar el UUID generado
      documentNumb: body.documentNumb,
      name: body.name,
      lastName: body.lastName,
      address: body.address,
      phoneNumber: body.phoneNumber,
      email: body.email,
      career: body.career
    }
  };
  await dynamo.put(params).promise();
  return buildResponse(201, params.Item);
};

const updateItem = async (event) => {
  const body = JSON.parse(event.body);
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: event.pathParameters.proxy
    },
    UpdateExpression: "set documentNumb = :documentNumb, name = :name, lastName = :lastName, address = :address, phoneNumber = :phoneNumber, email = :email, career = :career",
    ExpressionAttributeValues: {
      ":documentNumb": body.documentNumb,
      ":name": body.name,
      ":lastName": body.lastName,
      ":address": body.address,
      ":phoneNumber": body.phoneNumber,
      ":email": body.email,
      ":career": body.career
    }
  };
  await dynamo.update(params).promise();
  return buildResponse(200, body);
};

const deleteItem = async (event) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: event.pathParameters.proxy
    }
  };
  await dynamo.delete(params).promise();
  return buildResponse(200, { message: 'Item deleted' });
};

const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};
