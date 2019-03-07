import { connect } from "react-redux";
import MessagesList from "../components/MessagesList";

const mapStateToProps = state => {
  let messages;
  if (
    state.session.activeChat &&
    state.messages.byChats[state.session.activeChat]
  ) {
    messages = state.messages.byChats[state.session.activeChat].map(
      messageId => state.messages.byId[messageId]
    );
  } else {
    messages = [];
  }

  return {
    messages,
    users: state.users.byId,
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
