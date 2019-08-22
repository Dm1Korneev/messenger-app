import { connect } from 'react-redux';
import { register, signIn } from '../redux/actions';
import SignIn from '../components/SignIn';

const mapStateToProps = (state) => ({
  loginError: state.errors.LOGIN,
  registerError: state.errors.REGISTER,
});

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (...args) => dispatch(signIn(...args)),
  onRegister: (...args) => dispatch(register(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
