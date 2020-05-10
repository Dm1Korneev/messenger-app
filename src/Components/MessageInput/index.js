import commonHoc from 'Components/commonHoc';

import { sendMessage } from 'Redux/actions';
import MessageInput from './MessageInput';

const mapDispatchToProps = {
  onSendMessage: sendMessage,
};

const Container = commonHoc(MessageInput, {
  mapDispatchToProps,
});

export { Container as MessageInput };
