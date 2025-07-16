const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Protect all routes after this middleware (require login)
router.use(protect);

// User profile routes
router.get('/me', userController.getMe);

// Admin-only routes
router.use(restrictTo('admin'));

// Full CRUD operations (admin only)
router.route('/')
  .get(userController.getAllUsers);

router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;