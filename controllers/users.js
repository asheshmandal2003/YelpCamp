const User = require("../models/user");

module.exports.registerPage = (req, res) => {
  res.render("registration/register");
};

module.exports.userRegistration = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    try {
      const registeredUser = await User.register(user, password);
      req.logIn(registeredUser, (err) => {
        if (err) return next(err);
        req.flash(
          "success",
          `Welcome to YelpCamp ${req.user.username.slice(
            0,
            req.user.username.indexOf(" ") + 1
          )}:)`
        );
        res.redirect("/campgrounds");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/register");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.userLogin = (req, res) => {
  req.flash("success", "Welocome Back to YelpCamp :)");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};

module.exports.loginPage = (req, res) => {
  res.render("registration/login");
};

module.exports.userLogout = (req, res, next) => {
  req.logOut(() => {
    try {
      req.flash("success", "You're Logged Out Now!");
      res.redirect("/campgrounds");
    } catch (error) {
      next(error);
    }
  });
};
