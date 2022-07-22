export const getJWTSecret = () => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET env variable should be setted');
  }

  return JWT_SECRET;
};
