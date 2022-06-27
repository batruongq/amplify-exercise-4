/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 const { Client } = require('pg');

 const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
try {
  client.connect()
} catch(err) {
  console.log('Database connect', err)
}


exports.handler = async (event, context) => {
  const userAttributes = event.request.userAttributes;

  if (userAttributes.sub) {
    const query = `INSERT INTO tblUsers(id, email, phone_number) values ('${userAttributes.sub}', '${userAttributes.email}', '${userAttributes.phone_number}')`;

    try {
      await client.query(query)
  
      res.json({
        message: 'Add employee successfully'
      })
    } catch(err) {
      res.json(err)
    }
  
    client.end
  } else {
    console.log('Error: Nothing insert to database', event);
  }

  return event
};
