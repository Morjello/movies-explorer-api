const Movie = require("../models/movie");
const { constants } = require("../utils/constants");
const NotFoundError = require("../errors/not-found-err");
const ValidationError = require("../errors/validation-error");
const ForbiddenError = require("../errors/forbidden-error");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(constants.OK).send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    res.status(constants.OK).send(movie);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new ValidationError(constants.INCORRECT_MOVIE_DATA));
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findById(req.params._id);
    if (!deletedMovie) {
      throw new NotFoundError(constants.MOVIE_NOT_FOUND);
    }
    if (deletedMovie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(constants.CANNOT_BE_REMOVED_BY_ANOTHER_USER);
    }
    await deletedMovie.delete();
    res.status(constants.OK).send(deletedMovie);
  } catch (err) {
    if (err.name === "CastError") {
      return next(
        new ValidationError(constants.INCORRECT_MOVIE_DATA_FOR_DELETE)
      );
    }
    next(err);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
