import { connect } from "react-redux";
import { sendMessage } from "../redux/actions";
import MessageInput from "../components/MessageInput";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onSendMessage: messageText => dispatch(sendMessage(messageText))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);
