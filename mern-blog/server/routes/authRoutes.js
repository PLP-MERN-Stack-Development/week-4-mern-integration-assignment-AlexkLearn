const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);
router.put('/update', protect, authController.updateUser);
router.put('/update-password', protect, authController.updatePassword);

module.exports = router;