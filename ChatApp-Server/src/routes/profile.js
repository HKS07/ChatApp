const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');


router.get('/:id',profileController.getProfile);
router.post('/',profileController.createProfile);
router.put('/:id',profileController.updateProfile);

module.exports = router