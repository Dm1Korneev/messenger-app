export type User = {
    avatar: string;
    email: string;
    name: string;
    _id: string;
}

export type Chat = {
    admin: string;
    avatar: string;
    title: string;
    users: string[];
    _id: string;
}

export type Message = {
    author: string;
    chat: string;
    dateTime: string;
    _id: string;
}
