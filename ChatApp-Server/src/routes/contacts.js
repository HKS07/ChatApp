import express from 'express';
import {getAllContacts,addContact,deleteContact,updateContact} from '../controllers/contactsController.js';
const router = express.Router();

router.get('/:userId',getAllContacts);
// router.get('/:id',contactController.getContact);
router.post('/',addContact);
router.delete('/',deleteContact);
router.put('/',updateContact);

export {router};