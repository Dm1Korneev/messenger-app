import commonHoc from 'Containers/commonHoc';

import { loadMessages } from 'Redux/actions';

import { usersByIdSelector } from 'Selectors/users';
import { currentUserSelector } from 'Selectors/session';
import { messagesTreeSelector } from 'Selectors/messages';

import MessagesList from 'Components/MessagesList';

const mapStateToProps = (state) => ({
  messagesTree: messagesTreeSelector(state),
  users: usersByIdSelector(state),
  user: currentUserSelector(state),
});

const mapDispatchToProps = {
  loadMessages,
};

export default commonHoc(MessagesList, {
  mapStateToProps,
  mapDispatchToProps,
});
