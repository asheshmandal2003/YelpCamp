const express = require("express");
const passport = require("passport");
const { storeReturnTo } = require("../middleware/isRegistered");
const validateUserRegistration = require("../schemas/validRegistration");
const users = require("../controllers/users");

const router = express.Router();

router
  .route("/register")
  .get(users.registerPage)
  .post(validateUserRegistration, users.userRegistration);

router
  .route("/login")
  .get(users.loginPage)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.userLogin
  );

router.get("/logout", users.userLogout);

module.exports = router;
