
import { Message, User } from 'Types';

type DateTimeNode = {
  dateTime: Date;
  children: Message[];
}

type AuthorNode = {
  author: string;
  children: DateTimeNode[];
}

type MessagesTree = AuthorNode[]

export const getMesagesTree = ({ messages }: { messages: Message[], users: User[] }) => {
  const messagesTree: MessagesTree = [];
  let authorNode: AuthorNode;
  let dateTimeNode: DateTimeNode;
  let dateTime: Date;
  let lastNodeDateTime: Date;
  messages.forEach((element, index) => {
    dateTime = new Date(element.dateTime);
    const currentElementDateTime = new Date(dateTime.getTime());
    currentElementDateTime.setSeconds(0);
    currentElementDateTime.setMilliseconds(0);
    if (index === 0 || authorNode.author !== element.author) {
      messagesTree.push({ author: element.author, children: [] });
      authorNode = messagesTree[messagesTree.length - 1];
      authorNode.children.push({
        dateTime,
        children: [],
      });
      dateTimeNode = authorNode.children[authorNode.children.length - 1];
      dateTimeNode.children.push(element);
      lastNodeDateTime = currentElementDateTime;
    } else if (currentElementDateTime > lastNodeDateTime) {
      authorNode.children.push({
        dateTime,
        children: [],
      });
      dateTimeNode = authorNode.children[authorNode.children.length - 1];
      dateTimeNode.children.push(element);
      lastNodeDateTime = currentElementDateTime;
    } else {
      dateTimeNode.children.push(element);
    }
  });

  return messagesTree;
};
