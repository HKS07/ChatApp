import express from 'express';
import {getAllChats,postChat,updateChat,deleteChat}  from '../controllers/chatsController.js';
const router = express.Router();

router.get('/',getAllChats);
router.post('/',postChat);
router.put('/:chatId',updateChat);
router.delete('/:chatId',deleteChat);

export {router};