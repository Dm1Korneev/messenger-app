import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';

import { getS3Bucket } from './getS3Bucket';

export function loadToAWS(file: Express.Multer.File) {
  return new Promise<string>((resolve) => {
    const s3 = new S3();
    const params = {
      Bucket: getS3Bucket(),
      Key: uuidv4(),
      Body: file.buffer,
      ACL: 'public-read',
    };

    s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
      if (err) {
        return Promise.reject(err);
      }
      return resolve(data.Location);
    });
  });
}
