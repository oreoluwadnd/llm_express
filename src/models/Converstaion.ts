import { Schema, model, Document } from 'mongoose';

interface IConversation extends Document {
  model: string;
  question: string;
  response: string;
  createdAt: Date;
}

const conversationSchema = new Schema<IConversation>({
  model: { type: String, required: true },
  question: { type: String, required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Conversation = model<IConversation>('Conversation', conversationSchema);