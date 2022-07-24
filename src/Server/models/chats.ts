import mongoose from 'mongoose';

interface IChat {
  title: string,
  admin: mongoose.Types.ObjectId,
  users: mongoose.Types.ObjectId[],
  avatar: string,
}

export interface IChatDocument extends IChat, Document {}

const chatSchema = new mongoose.Schema<IChatDocument>({
  title: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  avatar: { type: String },
});

mongoose.model<IChatDocument>('Chat', chatSchema);

export const ChatModel = mongoose.model<IChatDocument>('Chat');
