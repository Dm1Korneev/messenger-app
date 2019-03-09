import { connect } from "react-redux";
import { signIn, register } from "../redux/actions";
import SignIn from "../components/SignIn";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onSignIn: (...args) => dispatch(signIn(...args)),
  onRegister: (...args) => dispatch(register(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
