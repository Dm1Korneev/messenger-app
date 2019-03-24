import { connect } from "react-redux";
import { loadMessages, setBottomPosition } from "../redux/actions";
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
    bottomPosition: state.session.bottomPosition,
    messages,
    users: state.users.byId,
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(loadMessages()),
  setBottomPosition: value => dispatch(setBottomPosition(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
