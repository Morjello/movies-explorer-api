const router = require("express").Router();
const { login, register } = require("../controllers/users");
const { loginValidation, registerValidation } = require("../middlewares/celebrate");

router.post(
  "/signin",
  loginValidation,
  login
);

router.post(
  "/signup",
  registerValidation,
  register
);

module.exports = router;
