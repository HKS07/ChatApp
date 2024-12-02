import express from 'express';
import {getAllMessages,sendMessage,deleteMessage,updateMessage} from '../controllers/messagesController.js';
const router = express.Router();

router.get('/',getAllMessages);
router.post('/:id',sendMessage);
router.delete('/',deleteMessage);
router.put('/',updateMessage);

export {router};