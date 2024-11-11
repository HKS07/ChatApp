const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.get('/',messagesController.getAllMessages);
router.post('/:id',messagesController.sendMessage);
router.delete('/',messagesController.deleteMessage);
router.put('/',messagesController.updateMessage);

module.exports = router;