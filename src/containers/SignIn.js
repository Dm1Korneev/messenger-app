import commonHoc from 'Containers/commonHoc';

import { LOGIN, REGISTER } from 'Constants/actionNames';
import { register, signIn } from 'Redux/actions';
import { errorSelector } from 'Selectors/errors';

import SignIn from 'Components/SignIn';

const mapStateToProps = (state) => ({
  loginError: errorSelector(state, LOGIN),
  registerError: errorSelector(state, REGISTER),
});

const mapDispatchToProps = {
  onSignIn: signIn,
  onRegister: register,
};

export default commonHoc(SignIn, {
  mapStateToProps,
  mapDispatchToProps,
});
