
export const getS3Bucket = () => {
  const { S3_BUCKET } = process.env;

  if (!S3_BUCKET) {
    throw new Error('S3_BUCKET env variable should be setted');
  }

  return S3_BUCKET;
};
