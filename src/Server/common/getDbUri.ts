
export const getDbUri = () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI env variable should be setted');
  }

  return MONGODB_URI;
};
