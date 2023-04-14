const router = require("express").Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");
const { movieCreateValidation, movieDeleteValidation } = require("../middlewares/celebrate");

router.get("/", getMovies);
router.post(
  "/",
  movieCreateValidation,
  createMovie
);
router.delete(
  "/:_id",
  movieDeleteValidation,
  deleteMovie
);

module.exports = router;
