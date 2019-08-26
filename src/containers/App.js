import commonHoc from 'Containers/commonHoc';

import { loginFromStore } from 'Redux/actions';
import { chatDialogIsOpenSelector, isLoggedInSelector, userModifyDialogIsOpenSelector } from 'Selectors/session';

import App from 'Components/App';

const mapStateToProps = (state) => ({
  chatDialogIsOpen: chatDialogIsOpenSelector(state),
  userModifyDialogIsOpen: userModifyDialogIsOpenSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  loginFromStore,
};

export default commonHoc(App, {
  mapStateToProps,
  mapDispatchToProps,
});
