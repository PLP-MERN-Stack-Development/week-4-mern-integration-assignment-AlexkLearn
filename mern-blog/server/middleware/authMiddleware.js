const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { AppError } = require('./errorMiddleware');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // 1) Get token from headers or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const user = await User.findById(decoded.id).select('+role');
    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('Not authorized to perform this action', 403);
    }
    next();
  };
};