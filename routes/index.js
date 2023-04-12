const router = require("express").Router();
const { errors } = require("celebrate");
const usersRoutes = require("./users");
const moviesRoutes = require("./movies");
const authRoutes = require("./auth");
const auth = require("../middlewares/auth");
const { requestLogger, errorLogger } = require("../middlewares/logger");
const errorHandler = require("../middlewares/errorHandler");
const NotFoundError = require("../errors/not-found-err");
const { constants } = require("../utils/constants");

router.use(requestLogger);

router.use("/", authRoutes);
router.use(auth);
router.use("/users", usersRoutes);
router.use("/movies", moviesRoutes);
router.use((req, res, next) => next(new NotFoundError(constants.PAGE_NOT_FOUND)));

router.use(errorLogger);
router.use(errors());
router.use(errorHandler);

module.exports = router;
