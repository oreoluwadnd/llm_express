import express from 'express';
import { getConversationDetails, getConversationHistory, submitQuery } from '../controller/Converstaion';

const router = express.Router();

router.post('/query',
 submitQuery);
router.get('/conversations', getConversationHistory);
router.get('/conversations/:id', getConversationDetails);

export default router;