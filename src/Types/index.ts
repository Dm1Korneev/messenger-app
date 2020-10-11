export type User = {
    avatar: string;
    email: string;
    name: string;
    _id: string;
}

export type Chat = {
    admin: User['_id'];
    avatar: string;
    title: string;
    users: User['_id'][];
    _id: string;
}

export type Message = {
    author: User['_id'];
    chat: Chat['_id'];
    dateTime: Date;
    text: string;
    _id: string;
}
