const { celebrate, Joi } = require("celebrate");
const { safeLink } = require("../utils/safe-link");

const loginValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});
const movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(safeLink),
    trailerLink: Joi.string().required().pattern(safeLink),
    thumbnail: Joi.string().required().pattern(safeLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.required(),
  }),
});
const movieDeleteValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  loginValidation,
  registerValidation,
  userUpdateValidation,
  movieCreateValidation,
  movieDeleteValidation
};
