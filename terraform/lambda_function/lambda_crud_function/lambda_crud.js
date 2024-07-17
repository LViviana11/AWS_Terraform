const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
  let response;
  try {
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
  } catch (error) {
    console.error('Error processing request:', error);
    response = buildResponse(500, 'Internal Server Error');
  }
  return response;
};

const getItem = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: event.pathParameters.proxy
      }
    };
    const result = await dynamo.get(params).promise();
    if (!result.Item) {
      return buildResponse(404, { message: 'Item not found' });
    }
    return buildResponse(200, result.Item);
  } catch (error) {
    console.error('Error getting item:', error);
    return buildResponse(500, 'Internal Server Error');
  }
};

const getAllItems = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME
    };
    const result = await dynamo.scan(params).promise();
    return buildResponse(200, result.Items);
  } catch (error) {
    console.error('Error getting all items:', error);
    return buildResponse(500, 'Internal Server Error');
  }
};

const createItem = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const itemId = uuidv4();
    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: itemId,
        documentNumb: body.documentNumb,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        phoneNumber: body.phoneNumber,
        email: body.email,
        career: body.career
      }
    };
    await dynamo.put(params).promise();
    return buildResponse(201, params.Item);
  } catch (error) {
    console.error('Error creating item:', error);
    return buildResponse(500, 'Internal Server Error');
  }
};

const updateItem = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: event.pathParameters.proxy
      },
      UpdateExpression: "set documentNumb = :documentNumb, #firstName = :firstName, lastName = :lastName, address = :address, phoneNumber = :phoneNumber, email = :email, career = :career",
      ExpressionAttributeValues: {
        ":documentNumb": body.documentNumb,
        ":firstName": body.firstName,
        ":lastName": body.lastName,
        ":address": body.address,
        ":phoneNumber": body.phoneNumber,
        ":email": body.email,
        ":career": body.career
      },
      ExpressionAttributeNames: {
        "#firstName": "firstName"
      },
      ReturnValues: "ALL_NEW"
    };
    const result = await dynamo.update(params).promise();
    return buildResponse(200, result.Attributes);
  } catch (error) {
    console.error('Error updating item:', error);
    return buildResponse(500, 'Internal Server Error');
  }
};

const deleteItem = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: event.pathParameters.proxy
      }
    };
    await dynamo.delete(params).promise();
    return buildResponse(200, { message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return buildResponse(500, 'Internal Server Error');
  }
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
