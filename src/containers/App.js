import { connect } from "react-redux";
import App from "../components/App";
import { loginFromStore } from "../redux/actions";

const mapStateToProps = state => ({
  addChatDialogIsOpen: state.session.addChatDialogIsOpen,
  userModifyDialogIsOpen: state.session.userModifyDialogIsOpen,
  isLoggedIn: state.session.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  loginFromStore: () => dispatch(loginFromStore())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);