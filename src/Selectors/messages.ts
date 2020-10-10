
import { createSelector } from '@reduxjs/toolkit';

import { activeChatIdSelector } from 'Selectors/session';
import { RootState } from 'Redux/reducers';
import { Message } from 'Types';

const messagesSelector = (state: RootState) => state.messages;

type DateTimeNode = {
  dateTime: Date;
  children: Message[];
}

type AuthorNode = {
  author: string;
  children: DateTimeNode[];
}

type MessagesTree = AuthorNode[]

export const messagesTreeSelector = (state: RootState) => createSelector(
  [messagesSelector, activeChatIdSelector],
  (messages, activeChatId) => {
    let currentMessages: Message[];

    if (activeChatId && messages.byChats[activeChatId]) {
      currentMessages = messages.byChats[activeChatId].map(
        (messageId) => messages.byId[messageId],
      );
    } else {
      currentMessages = [];
    }

    const messagesTree: MessagesTree = [];
    let authorNode: AuthorNode;
    let dateTimeNode: DateTimeNode;
    let dateTime: Date;

    currentMessages.forEach((element, index) => {
      dateTime = new Date(element.dateTime);
      dateTime.setSeconds(0);
      dateTime.setMilliseconds(0);
      if (index === 0 || authorNode.author !== element.author) {
        messagesTree.push({ author: element.author, children: [] });
        authorNode = messagesTree[messagesTree.length - 1];
        authorNode.children.push({
          dateTime,
          children: [],
        });
        dateTimeNode = authorNode.children[authorNode.children.length - 1];
        dateTimeNode.children.push(element);
      } else if (dateTime > dateTimeNode.dateTime) {
        authorNode.children.push({
          dateTime,
          children: [],
        });
        dateTimeNode = authorNode.children[authorNode.children.length - 1];
        dateTimeNode.children.push(element);
      } else {
        dateTimeNode.children.push(element);
      }
    });

    return messagesTree;
  },
)(state);
