const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error properties
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Send response
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message
  });
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  AppError
};