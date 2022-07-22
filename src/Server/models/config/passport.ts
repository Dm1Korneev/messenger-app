import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { UserModel } from '../users';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (
    userName,
    password,
    done,
  ) => {
    UserModel.findOne({ email: userName }, null, null, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }),
);

