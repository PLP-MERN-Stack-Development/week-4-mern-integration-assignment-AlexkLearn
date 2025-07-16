const Post = require('../models/Post.model');
const User = require('../models/User.model');
const { AppError } = require('../middleware/errorMiddleware');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllPosts = async (req, res, next) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Post.find(JSON.parse(queryStr))
      .populate('author', 'username avatar')
      .populate('comments');

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const posts = await query;
    const total = await Post.countDocuments();

    res.status(200).json({
      success: true,
      results: posts.length,
      total,
      data: {
        posts
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'username avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username avatar'
        }
      });

    if (!post) {
      throw new AppError('No post found with that ID', 404);
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: {
        post
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, tags, status } = req.body;
    
    const postData = {
      title,
      content,
      tags: tags ? tags.split(',') : [],
      status,
      author: req.user.id
    };

    if (req.file) {
      postData.featuredImage = `/uploads/${req.file.filename}`;
    }

    const post = await Post.create(postData);

    res.status(201).json({
      success: true,
      data: {
        post
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, tags, status } = req.body;
    
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      throw new AppError('No post found with that ID', 404);
    }

    // Check if user is post author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new AppError('Not authorized to update this post', 403);
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags ? tags.split(',') : post.tags;
    post.status = status || post.status;

    if (req.file) {
      post.featuredImage = `/uploads/${req.file.filename}`;
    }

    await post.save();

    res.status(200).json({
      success: true,
      data: {
        post
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      throw new AppError('No post found with that ID', 404);
    }

    // Check if user is post author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new AppError('Not authorized to delete this post', 403);
    }

    await post.remove();

    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .sort('-createdAt')
      .populate('author', 'username avatar');

    res.status(200).json({
      success: true,
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (err) {
    next(err);
  }
};