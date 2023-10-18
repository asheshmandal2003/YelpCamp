const Campground = require("../models/campground");

const wrapRoute = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const foundCampground = await campground
    .populate("author")
    .then((data) => data)
    .catch((err) => err);
  const { author } = foundCampground;
  if (!campground) {
    req.flash("error", "Sorry! Can't find that campground! :(");
    return res.redirect("/campgrounds");
  }
  if (req.user === undefined || author.username !== req.user.username) {
    req.flash("error", "Access Denied!");
    res.redirect(`/campgrounds/${id}`);
  } else {
    return next();
  }
};

module.exports = wrapRoute;
