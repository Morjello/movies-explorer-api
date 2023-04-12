const router = require("express").Router();
const { login, register } = require("../controllers/users");
const { loginValidation, registerValidation } = require("../middlewares/celebrate");

router.post(
  "/signup",
  loginValidation,
  register
);

router.post(
  "/signin",
  registerValidation,
  login
);

module.exports = router;
