const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactsController');

router.get('/',contactController.getAllContacts);
router.get('/:id',contactController.getContact);
router.post('/',contactController.addContact);
router.delete('/',contactController.deleteContact);
router.put('/',contactController.updateContact);

module.exports = router;