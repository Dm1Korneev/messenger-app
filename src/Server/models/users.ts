import crypto from 'crypto';

import jwt from 'jsonwebtoken';
import mongoose, { Document } from 'mongoose';

import { getJWTSecret } from '../common';

interface IUser {
  email: string,
  name: string,
  avatar: string,
  hash: string,
  salt: string,
}

export interface IUserDocument extends IUser, Document {
  setPassword: (password: string) => Promise<void>;
  validPassword: (password: string) => Promise<boolean>;
  generateJwt: () => Promise<void>;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  email: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  avatar: { type: String },
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function validPassword(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');

  return hash === this.hash;
};

userSchema.methods.generateJwt = function generateJwt() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      exp: expiry.getTime() / 1000,
    },
    getJWTSecret(),
  );
};

mongoose.model<IUserDocument>('User', userSchema);

export const UserModel = mongoose.model<IUserDocument>('User');
