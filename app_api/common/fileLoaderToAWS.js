const aws = require("aws-sdk");
const S3_BUCKET = process.env.S3_BUCKET;
const fs = require("fs");

module.exports = function loadToAWS(file) {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3();
    var params = {
      Bucket: S3_BUCKET,
      Key: file.filename,
      Body: fs.createReadStream(file.path),
      ACL: "public-read"
    };

    s3.upload(params, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      resolve(data.Location);
      fs.unlink(file.path, error => {
        if (error) {
          console.log(error);
        }
      });
    });
  });
};
