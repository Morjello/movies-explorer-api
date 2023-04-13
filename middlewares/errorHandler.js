const { constants } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? constants.SERVER_ERROR : message,
  });

  next();
};

module.exports = errorHandler;
