const aws = require('aws-sdk');

const { S3_BUCKET } = process.env;
const { v4: uuidv4 } = require('uuid');

module.exports = function loadToAWS(file) {
  return new Promise((resolve) => {
    const s3 = new aws.S3();
    const params = {
      Bucket: S3_BUCKET,
      Key: uuidv4(),
      Body: file.buffer,
      ACL: 'public-read',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        return Promise.reject(err);
      }
      return resolve(data.Location);
    });
  });
};
