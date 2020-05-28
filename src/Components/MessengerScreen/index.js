import commonHoc from 'Components/commonHoc';
import { chatDialogIsOpenSelector, userModifyDialogIsOpenSelector } from 'Selectors/session';

import MessengerScreen from './MessengerScreen';

const mapStateToProps = (state) => ({
  chatDialogIsOpen: chatDialogIsOpenSelector(state),
  userModifyDialogIsOpen: userModifyDialogIsOpenSelector(state),
});

export default commonHoc(MessengerScreen, {
  mapStateToProps,
});

