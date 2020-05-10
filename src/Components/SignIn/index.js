import commonHoc from 'Components/commonHoc';

import { LOGIN, REGISTER } from 'Constants/actionNames';
import { register, signIn } from 'Redux/actions';
import { errorSelector } from 'Selectors/errors';

import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  loginError: errorSelector(state, LOGIN),
  registerError: errorSelector(state, REGISTER),
});

const mapDispatchToProps = {
  onSignIn: signIn,
  onRegister: register,
};

const Container = commonHoc(SignIn, {
  mapStateToProps,
  mapDispatchToProps,
});

export { Container as SignIn };
