import { connect } from 'react-redux';

import { modifyUser, setUserModifyDialogIsOpen } from 'Redux/actions';
import UserModifyDialog from 'Components/UserModifyDialog';

const mapStateToProps = (state) => ({
  user: state.session.user,
  error: state.errors.MODIFY_USER,
});

const mapDispatchToProps = (dispatch) => ({
  closeUserModifyDialog: () => dispatch(setUserModifyDialogIsOpen(false)),
  onSave: (...args) => dispatch(modifyUser(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserModifyDialog);
