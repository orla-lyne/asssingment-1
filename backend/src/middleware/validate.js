const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
    return;
  }

  const message = result.array()[0].msg;
  next(new AppError(message, 400));
};

module.exports = validate;
