import commonHoc from 'Containers/commonHoc';

import {
  logOut,
  setDrawerIsOpen,
  setUserModifyDialogIsOpen,
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
  openUserModifyDialog: () => setUserModifyDialogIsOpen(true),
};

export default commonHoc(TopBar, {
  mapStateToProps,
  mapDispatchToProps,
});
