import { connect } from "react-redux";
import { loadMessages } from "../redux/actions";
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

  const messagesTree = [];
  let authorNode, dateTimeNode, dateTime;
  messages.forEach((element, index) => {
    dateTime = new Date(element.dateTime);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    if (index === 0 || authorNode.author !== element.author) {
      messagesTree.push({ author: element.author, childrens: [] });
      authorNode = messagesTree[messagesTree.length - 1];
      authorNode.childrens.push({
        dateTime: dateTime,
        childrens: []
      });
      dateTimeNode = authorNode.childrens[authorNode.childrens.length - 1];
      dateTimeNode.childrens.push(element);
    } else if (dateTime > dateTimeNode.dateTime) {
      authorNode.childrens.push({
        dateTime: dateTime,
        childrens: []
      });
      dateTimeNode = authorNode.childrens[authorNode.childrens.length - 1];
      dateTimeNode.childrens.push(element);
    } else {
      dateTimeNode.childrens.push(element);
    }
  });

  return {
    messagesTree,
    users: state.users.byId,
    user: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(loadMessages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
