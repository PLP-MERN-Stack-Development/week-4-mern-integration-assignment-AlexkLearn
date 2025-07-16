const User = require('../models/User.model');
const { AppError } = require('../middleware/errorMiddleware');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      results: users.length,
      data: { users }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user
    }
  });
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,
        runValidators: true 
      }
    );
    if (!updatedUser) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      success: true,
      data: { 
        user: updatedUser 
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    next(err);
  }
};