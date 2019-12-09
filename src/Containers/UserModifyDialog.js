import commonHoc from 'Containers/commonHoc';

import { modifyUser, setModifyUserDialogIsOpen } from 'Redux/actions';
import { MODIFY_USER } from 'Constants/actionNames';

import { currentUserSelector } from 'Selectors/session';
import { errorSelector } from 'Selectors/errors';

import UserModifyDialog from 'Components/UserModifyDialog';

const mapStateToProps = (state) => ({
  user: currentUserSelector(state),
  error: errorSelector(state, MODIFY_USER),
});

const mapDispatchToProps = {
  closeUserModifyDialog: () => setModifyUserDialogIsOpen(false),
  onSave: modifyUser,
};

export default commonHoc(UserModifyDialog, {
  mapStateToProps,
  mapDispatchToProps,
});
