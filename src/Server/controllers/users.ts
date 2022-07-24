import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import { loadToAWS } from '../common';
import { UserModel, IUserDocument } from '../models';

import {
  sendJsResponse, isUserNameAvailable, isEmailAvailable, getUserIdFromAuthorizationHeader,
} from './common';

export const getUsers: RequestHandler = (_req, res) => {
  UserModel.aggregate<IUserDocument>([
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        avatar: 1,
      },
    },
  ])
    .then((users) => sendJsResponse(res, 200, users))
    .catch((err) => sendJsResponse(res, 400, err));
};

export const getUserByID: RequestHandler = (req, res) => {
  if (!req.params || !req.params.userId) {
    sendJsResponse(res, 400, { message: "No 'userId' in request" });
    return;
  }

  const userId = mongoose.Types.ObjectId(req.params.userId);
  UserModel.findById(
    userId,
    {
      _id: 1,
      name: 1,
      email: 1,
      avatar: 1,
    },
  )
    .exec()
    .then((user) => {
      if (!user) {
        sendJsResponse(res, 404, { message: "'userId' not found" });
        return;
      }
      sendJsResponse(res, 200, user);
    })
    .catch((err) => sendJsResponse(res, 400, err));
};

export const getCurrentUser: RequestHandler = (req, res) => {
  const userId = getUserIdFromAuthorizationHeader(req.headers.authorization);
  const user = mongoose.Types.ObjectId(userId);

  UserModel.findById(
    user,
    {
      _id: 1,
      name: 1,
      email: 1,
      avatar: 1,
    },
  )
    .exec()
    .then((user) => {
      if (!user) {
        sendJsResponse(res, 404, { message: 'Current user not found' });
        return;
      }
      sendJsResponse(res, 200, user);
    })
    .catch((err) => sendJsResponse(res, 400, err));
};

export const updateUserByID: RequestHandler = async (req, res) => {
  if (!req.params || !req.params.userId) {
    sendJsResponse(res, 400, { message: "No 'userId' in request" });
    return;
  }
  const userId = mongoose.Types.ObjectId(req.params.userId);
  const {
    name, email, password, avatar,
  } = req.body;
  let newAvatar: string;
  let avatarIsCange = false;
  if (req.file) {
    newAvatar = await loadToAWS(req.file);
    avatarIsCange = true;
  } else if (avatar === 'undefined') {
    newAvatar = '';
    avatarIsCange = true;
  }

  Promise.all([
    isUserNameAvailable(name, userId),
    isEmailAvailable(email, userId),
  ])
    .then(([userNameIsFound, emailNameIsFound]) => {
      let errorMessage = '';
      if (userNameIsFound) {
        errorMessage += 'Username is already use';
      }
      if (emailNameIsFound) {
        errorMessage += '\nEmail is already use';
      }
      if (errorMessage) {
        const error = new Error(errorMessage);
        sendJsResponse(res, 400, error);
        return Promise.reject();
      }

      return UserModel.findById(userId);
    })
    .then((userParam) => {
      const user = userParam;
      if (!user) {
        sendJsResponse(res, 404, { message: "'userId' not found" });
        return undefined;
      }
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (avatarIsCange) {
        user.avatar = newAvatar;
      }

      if (password) {
        user.setPassword(password);
      }
      return user.save();
    })
    .then((user) => {
      if (!user) {
        sendJsResponse(res, 404, { message: "'userId' not found" });
        return;
      }
      const token = user.generateJwt();
      sendJsResponse(res, 200, { token });
    })
    .catch((err) => {
      if (!err) {
        return;
      }

      sendJsResponse(res, 404, err);
    });
};

export const register: RequestHandler = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJsResponse(res, 400, { message: 'all fields required' });
    return;
  }

  const { name, email, password } = req.body;
  let avatar = '';
  if (req.file) {
    avatar = await loadToAWS(req.file);
  }

  Promise.all([isUserNameAvailable(name), isEmailAvailable(email)])
    .then(([userNameIsFound, emailNameIsFound]) => {
      let errorMessage = '';
      if (userNameIsFound) {
        errorMessage += 'Username is already use';
      }
      if (emailNameIsFound) {
        errorMessage += '\nEmail is already use';
      }
      if (errorMessage) {
        const error = new Error(errorMessage);
        sendJsResponse(res, 400, error);
        return Promise.reject();
      }

      const user = new UserModel();

      user.name = name;
      user.email = email;
      user.avatar = avatar;

      user.setPassword(password);
      return user.save();
    })
    .then((user) => {
      const token = user.generateJwt();
      sendJsResponse(res, 200, { token });
    })
    .catch((err) => {
      if (!err) {
        return;
      }
      sendJsResponse(res, 404, err);
    });
};

export const login: RequestHandler = (req, res) => {
  if (!req.body.email || !req.body.password) {
    sendJsResponse(res, 400, { message: 'all fields required' });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      sendJsResponse(res, 404, err);
      return;
    }
    if (user) {
      const token = user.generateJwt();
      sendJsResponse(res, 200, { token });
    } else {
      sendJsResponse(res, 401, info);
    }
  })(req, res);
};
