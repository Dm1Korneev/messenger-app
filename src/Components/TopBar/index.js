import commonHoc from 'Components/commonHoc';

import {
  logOut,
  setDrawerIsOpen,
  setModifyUserDialogIsOpen,
} from 'Redux/actions';

import { currentUserSelector, drawerIsOpenSelector } from 'Selectors/session';

import TopBar from './TopBar';

const mapStateToProps = (state) => ({
  user: currentUserSelector(state),
  drawerIsOpen: drawerIsOpenSelector(state),
});

const mapDispatchToProps = {
  onDriwerOpen: () => setDrawerIsOpen(true),
  onLogout: logOut,
  openModifyUserDialog: () => setModifyUserDialogIsOpen(true),
};

const Container = commonHoc(TopBar, {
  mapStateToProps,
  mapDispatchToProps,
});

export { Container as TopBar };
