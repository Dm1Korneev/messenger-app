import { connect } from 'react-redux';

import App from 'Components/App';
import { loginFromStore } from 'Redux/actions';

const mapStateToProps = (state) => ({
  chatDialogIsOpen:
    state.session.addChatDialogIsOpen || state.session.modifyChatDialogIsOpen,
  userModifyDialogIsOpen: state.session.userModifyDialogIsOpen,
  isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  loginFromStore: () => dispatch(loginFromStore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
