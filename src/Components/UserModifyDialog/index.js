import commonHoc from 'Components/commonHoc';
import { modifyUser, setModifyUserDialogIsOpen } from 'Redux/actions';
import ActionNames from 'Constants/actionNames';
import { currentUserSelector } from 'Selectors/session';
import { errorSelector } from 'Selectors/errors';

import UserModifyDialog from './UserModifyDialog';

const mapStateToProps = (state) => ({
  user: currentUserSelector(state),
  error: errorSelector(state, ActionNames.MODIFY_USER),
});

const mapDispatchToProps = {
  closeUserModifyDialog: () => setModifyUserDialogIsOpen(false),
  onSave: modifyUser,
};

export default commonHoc(UserModifyDialog, {
  mapStateToProps,
  mapDispatchToProps,
});

