
import { createSelector } from 'reselect';

import { activeChatIdSelector } from 'Selectors/session';

const messagesSelector = (state) => state.messages;

export const messagesTreeSelector = (state) => createSelector(
  [messagesSelector, activeChatIdSelector],
  (messages, activeChatId) => {
    let currentMessages;

    if (activeChatId && messages.byChats[activeChatId]) {
      currentMessages = messages.byChats[activeChatId].map(
        (messageId) => messages.byId[messageId],
      );
    } else {
      currentMessages = [];
    }

    const messagesTree = [];
    let authorNode; let dateTimeNode; let dateTime;

    currentMessages.forEach((element, index) => {
      dateTime = new Date(element.dateTime);
      dateTime.setSeconds(0);
      dateTime.setMilliseconds(0);
      if (index === 0 || authorNode.author !== element.author) {
        messagesTree.push({ author: element.author, childrens: [] });
        authorNode = messagesTree[messagesTree.length - 1];
        authorNode.childrens.push({
          dateTime,
          childrens: [],
        });
        dateTimeNode = authorNode.childrens[authorNode.childrens.length - 1];
        dateTimeNode.childrens.push(element);
      } else if (dateTime > dateTimeNode.dateTime) {
        authorNode.childrens.push({
          dateTime,
          childrens: [],
        });
        dateTimeNode = authorNode.childrens[authorNode.childrens.length - 1];
        dateTimeNode.childrens.push(element);
      } else {
        dateTimeNode.childrens.push(element);
      }
    });

    return messagesTree;
  },
)(state);
