const AWS = require('aws-sdk');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const TABLE_NAME = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // Log the event
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
      console.log('Student:', student); // Log each student object
      const itemId = uuidv4(); // Generar un UUID único
      const dbParams = {
        TableName: TABLE_NAME,
        Item: {
          id: itemId,
          documentNumb: student.documentNumb,
          firstName: student.firstName,
          lastName: student.lastName,
          address: student.address,
          phoneNumber: student.phoneNumber,
          email: student.email,
          career: student.career
        }
      };
      await dynamo.put(dbParams).promise();
      console.log(`Inserted student with ID ${itemId}`); // Log each insertion
    }
    console.log(`Successfully processed ${students.length} records.`);
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
// const parseCSV = (stream) => {
//   return new Promise((resolve, reject) => {
//     const results = [];
//     stream.pipe(csv())
//       .on('data', (data) => results.push(data))
//       .on('end', () => resolve(results))
//       .on('error', (error) => reject(error));
//   });
// };

const parseCSV = (stream) => {
  return new Promise((resolve, reject) => {
    const results = [];
    stream.pipe(csv())
      .on('data', (data) => {
        // Map CSV data to the expected student object format
        const student = {
          documentNumb: data.documentNumb,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          career: data.career
        };
        results.push(student);
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};


