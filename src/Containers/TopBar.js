import commonHoc from 'Containers/commonHoc';

import {
  logOut,
  setDrawerIsOpen,
  setModifyUserDialogIsOpen,
} from 'Redux/actions';

import { currentUserSelector, drawerIsOpenSelector } from 'Selectors/session';

import TopBar from 'Components/TopBar';

const mapStateToProps = (state) => ({
  user: currentUserSelector(state),
  drawerIsOpen: drawerIsOpenSelector(state),
});

const mapDispatchToProps = {
  onDriwerOpen: () => setDrawerIsOpen(true),
  onLogout: logOut,
  openModifyUserDialog: () => setModifyUserDialogIsOpen(true),
};

export default commonHoc(TopBar, {
  mapStateToProps,
  mapDispatchToProps,
});
