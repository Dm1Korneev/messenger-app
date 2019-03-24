import { connect } from "react-redux";
import { setUserModifyDialogIsOpen, modifyUser } from "../redux/actions";
import UserModifyDialog from "../components/UserModifyDialog";

const mapStateToProps = state => ({
  user: state.session.user,
  error: state.errors.MODIFY_USER
});

const mapDispatchToProps = dispatch => ({
  closeUserModifyDialog: () => dispatch(setUserModifyDialogIsOpen(false)),
  onSave: (...args) => dispatch(modifyUser(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserModifyDialog);
