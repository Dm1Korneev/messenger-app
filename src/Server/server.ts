import path from 'path';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import passport from 'passport';

import { initDb } from './models/db';
import { getRoutes } from './routes';

dotenv.config();

initDb();
require('./models/config/passport');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

app.use(passport.initialize());
app.use('/api', getRoutes());

const FromtEndHandler: RequestHandler = (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
};
app.use(FromtEndHandler);

const catch404Handler: RequestHandler = (_req, _res, next) => {
  next(createError(404));
};
app.use(catch404Handler);

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
};
app.use(errorHandler);

export default app;
