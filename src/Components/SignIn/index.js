import commonHoc from 'Components/commonHoc';
import ActionNames from 'Constants/actionNames';
import { register, signIn } from 'Redux/actions';
import { errorSelector } from 'Selectors/errors';
import { loadingSelector } from 'Selectors/loading';

import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  loginError: errorSelector(state, ActionNames.LOGIN),
  registerError: errorSelector(state, ActionNames.REGISTER),
  isLoging: loadingSelector(state, ActionNames.LOGIN) || loadingSelector(state, ActionNames.REGISTER),
});

const mapDispatchToProps = {
  onSignIn: signIn,
  onRegister: register,
};

export default commonHoc(SignIn, {
  mapStateToProps,
  mapDispatchToProps,
});

