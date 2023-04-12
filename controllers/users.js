const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { constants } = require("../utils/constants");
const NotFoundError = require("../errors/not-found-err");
const ValidationError = require("../errors/validation-error");
const ConflictError = require("../errors/conflict-error");

const { NODE_ENV = config.NODE_ENV, JWT_SECRET = config.JWT_SECRET } = process.env;

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(constants.USER_NOT_FOUND);
    }
    res.status(constants.OK).send(user);
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true }
    );
    res.status(constants.OK).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        new ValidationError(constants.INCORRECT_DATA_FOR_UPDATE_USER)
      );
    }
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hash, name });
    res.status(constants.AUTH_OK).send({
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError(constants.USER_EXIST));
    }
    if (err.name === "ValidationError") {
      return next(
        new ValidationError(constants.INCORRECT_DATA_FOR_CREATE_USER)
      );
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
      {
        expiresIn: "7d",
      }
    );
    res.status(constants.AUTH_OK).send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  updateUser,
  register,
  login,
};
