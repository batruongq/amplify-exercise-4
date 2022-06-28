/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({ region: 'us-east-1' });

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


 app.get('/users/presignedUrlUpload', async function(req, res) {
  const bucketParams = {
    Bucket: 'userapiv2',
    Key: 'avatar/',
  };

  const command = new PutObjectCommand(bucketParams);
  const presignedURL = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  res.json({
    url: presignedURL
  })
});

app.put('/users', async function(req, res) {
  const user = req.body;
  const id = req.params.id;

  const query = `UPDATE tblUsers SET avatar_url = '${user.avatarUrl}' WHERE id = ${id};`;

  try {
    await client.query(query)

    res.json({
      message: 'Update successfully'
    })
  } catch(err) {
    res.json(err)
  }

  client.end
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
