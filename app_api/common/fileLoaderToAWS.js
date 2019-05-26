const aws = require("aws-sdk");
const S3_BUCKET = process.env.S3_BUCKET;
const uuidv4 = require("uuid/v4");

module.exports = function loadToAWS(file) {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3();
    const params = {
      Bucket: S3_BUCKET,
      Key: uuidv4(),
      Body: file.buffer,
      ACL: "public-read"
    };

    s3.upload(params, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      resolve(data.Location);
    });
  });
};
