import { connect } from 'react-redux';
import { sendMessage } from 'Redux/actions';
import MessageInput from 'Components/MessageInput';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onSendMessage: (messageText) => dispatch(sendMessage(messageText)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageInput);
