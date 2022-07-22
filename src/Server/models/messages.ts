import mongoose from 'mongoose';

interface IMessage {
  chat: mongoose.Types.ObjectId,
  text: string,
  author: mongoose.Types.ObjectId,
  dateTime: Date,
}

interface IMessageDocument extends IMessage, Document {}

const messageSchema = new mongoose.Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  text: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, default: Date.now, required: true },
});

mongoose.model<IMessageDocument>('Message', messageSchema);

export const MessageModel = mongoose.model<IMessageDocument>('Message');
