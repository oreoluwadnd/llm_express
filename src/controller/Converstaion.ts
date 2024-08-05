import { Request, Response } from 'express';
import { Conversation } from '../models/Converstaion';
import { sendQueryToPython } from '../utils';

export const submitQuery = async (req: Request, res: Response) => {
  try {
    const { model, question } = req.body;
    const response = await sendQueryToPython(model, question);
    const conversation = new Conversation({ model, question, response });
    await conversation.save();
    res.status(200).json({ message: 'Query submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getConversationHistory = async (req: Request, res: Response) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getConversationDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findById(id);
    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found' });
    } else {
      res.status(200).json(conversation);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};