const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const { constants } = require("../utils/constants");
const AuthError = require("../errors/auth-error");

const { NODE_ENV = config.NODE_ENV, JWT_SECRET = config.JWT_SECRET } =
  process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AuthError(constants.PLEASE_LOGIN));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return next(new AuthError(constants.PLEASE_LOGIN));
  }

  req.user = payload;

  next();
};

module.exports = auth;
