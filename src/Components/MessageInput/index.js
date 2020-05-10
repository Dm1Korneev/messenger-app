import commonHoc from 'Components/commonHoc';

import { sendMessage } from 'Redux/actions';
import MessageInput from './MessageInput';

const mapDispatchToProps = {
  onSendMessage: sendMessage,
};

export default commonHoc(MessageInput, {
  mapDispatchToProps,
});

