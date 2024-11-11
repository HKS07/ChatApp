const express = require('express')
const router = express.Router();
const chatsController = require('../controllers/chatsController');

router.get('/',chatsController.getAllChats);
router.post('/',chatsController.postChat);
router.put('/:chatId',chatsController.updateChat);
router.delete('/:chatId',chatsController.deleteChat);

module.exports = router;