const AWS = require('aws-sdk');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
  const bucketName = event.Records[0].s3.bucket.name;
  const objectKey = event.Records[0].s3.object.key;

  try {
    // Obtener el archivo del bucket S3
    const params = {
      Bucket: bucketName,
      Key: objectKey
    };
    const s3Stream = s3.getObject(params).createReadStream();

    // Detectar el tipo de archivo basado en la extensión
    const fileType = objectKey.split('.').pop().toLowerCase();

    let students;
    if (fileType === 'json') {
      students = await parseJSON(s3Stream);
    } else if (fileType === 'csv') {
      students = await parseCSV(s3Stream);
    } else {
      throw new Error('Unsupported file type');
    }

    // Almacenar cada estudiante en DynamoDB
    for (const student of students) {
      const itemId = uuidv4(); // Generar un UUID único
      const dbParams = {
        TableName: TABLE_NAME,
        Item: {
          id: itemId,
          documentNumber: student.documentNumber,
          name: student.name,
          lastName: student.lastName,
          address: student.address,
          phoneNumber: student.phoneNumber,
          email: student.email,
          career: student.career
        }
      };
      await dynamo.put(dbParams).promise();
    }
    return `Successfully processed ${students.length} records.`;
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error('Error processing file');
  }
};

// Función para parsear JSON
const parseJSON = async (stream) => {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('data', (chunk) => data += chunk);
    stream.on('end', () => resolve(JSON.parse(data)));
    stream.on('error', (error) => reject(error));
  });
};

// Función para parsear CSV
const parseCSV = (stream) => {
  return new Promise((resolve, reject) => {
    const results = [];
    stream.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};
