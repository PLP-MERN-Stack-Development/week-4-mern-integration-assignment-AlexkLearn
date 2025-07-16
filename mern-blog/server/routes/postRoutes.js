const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../utils/upload');

// Protect all routes after this middleware
router.use(protect);

router.route('/')
  .get(postController.getAllPosts)
  .post(upload.single('featuredImage'), postController.createPost);

router.route('/:slug')
  .get(postController.getPost)
  .patch(upload.single('featuredImage'), postController.updatePost)
  .delete(postController.deletePost);

router.get('/user/me', postController.getUserPosts);

module.exports = router;