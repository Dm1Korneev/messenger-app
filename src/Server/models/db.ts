import mongoose from 'mongoose';

import { getDbUri } from '../common';
import debug from '../debug';

export const initDb = () => {
  const dbURI = getDbUri();

  debug.log(dbURI);
  mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

  mongoose.connection.on('connected', () => {
    debug.log(`Mongoose connected to ${dbURI}`);
  });
  mongoose.connection.on('error', (err) => {
    debug.error(`Mongoose connection error: ${err}`);
  });
  mongoose.connection.on('disconnected', () => {
    debug.log('Mongoose disconnected');
  });

  const gracefulShutdown = (msg: string, callback: () => void) => {
    mongoose.connection.close(() => {
      debug.log(`Mongoose disconnected through ${msg}`);
      callback();
    });
  };

  process.on('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
      process.exit(0);
    });
  });
};

require('./chats');
require('./users');
require('./messages');