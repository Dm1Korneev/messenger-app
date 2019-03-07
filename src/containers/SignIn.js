import { connect } from "react-redux";
import { signIn, register } from "../redux/actions";
import SignIn from "../components/SignIn";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password, remember) =>
    dispatch(signIn(email, password, remember)),
  onRegister: (email, password, name, remember) =>
    dispatch(register(email, password, name, remember))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
