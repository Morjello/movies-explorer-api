const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");
const { userUpdateValidation } = require("../middlewares/celebrate");

router.get("/me", getUser);
router.patch(
  "/me",
  userUpdateValidation,
  updateUser
);

module.exports = router;
