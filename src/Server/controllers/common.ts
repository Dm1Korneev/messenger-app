import { Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

const UserModel = mongoose.model('User');

export const sendJsResponse = (res: Response, status: number, content: unknown) => {
  res.status(status);
  if (content instanceof Error) {
    res.json({ message: content.message });
  } else {
    res.json(content);
  }
};

const parseAuthorizationHeader = (authorizationHeader?: string): JwtPayload | null => {
  if (!authorizationHeader) {
    return null;
  }
  const parsed = jsonwebtoken.decode(authorizationHeader.split(' ')[1]);
  if (typeof parsed !== 'object' || !parsed) {
    return null;
  }
  return parsed;
};

export const getUserIdFromAuthorizationHeader = (authorizationHeader?: string): string => {
  const userInfo = parseAuthorizationHeader(authorizationHeader);
  const userId = userInfo?._id;
  if (!userInfo || !userId) {
    throw Error('Can not get user id from authorization header');
  }
  return userId;
};

export const isUserNameAvailable = (name: string, userId?: mongoose.Types.ObjectId) => UserModel.findOne(
  { name, _id: { $ne: userId } },
).exec();

export const isEmailAvailable = (email: string, userId?: mongoose.Types.ObjectId) => UserModel.findOne(
  { email, _id: { $ne: userId } },
).exec();
