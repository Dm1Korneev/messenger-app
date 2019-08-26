import commonHoc from 'Containers/commonHoc';

import { sendMessage } from 'Redux/actions';
import MessageInput from 'Components/MessageInput';

const mapDispatchToProps = {
  onSendMessage: sendMessage,
};

export default commonHoc(MessageInput, {
  mapDispatchToProps,
});
