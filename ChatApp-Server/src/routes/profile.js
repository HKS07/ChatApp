import express from 'express';
import {getProfile,createProfile,updateProfile} from '../controllers/profileController.js';
const router = express.Router();


router.get('/:id',getProfile);
router.post('/',createProfile);
router.put('/:id',updateProfile);

export {router};