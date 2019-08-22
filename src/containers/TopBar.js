import { connect } from 'react-redux';
import {
  logOut,
  setDrawerIsOpen,
  setUserModifyDialogIsOpen,
} from '../redux/actions';
import TopBar from '../components/TopBar';

const mapStateToProps = (state) => ({
  user: state.session.user,
  drawerIsOpen: state.session.drawerIsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  onDriwerOpen: () => dispatch(setDrawerIsOpen(true)),
  onLogout: () => dispatch(logOut()),
  openUserModifyDialog: () => dispatch(setUserModifyDialogIsOpen(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
