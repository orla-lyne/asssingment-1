const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message: error.isOperational ? error.message : "An unexpected server error occurred",
  });
};

module.exports = errorHandler;

