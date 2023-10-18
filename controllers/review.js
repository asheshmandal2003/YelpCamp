const Campground = require("../models/campground");
const Review = require("../models/review");
const AppError = require("../AppError");

module.exports.postReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Review Added!");
    res.redirect(`/campgrounds/${campground._id}`);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await Review.findById(review_id).populate("author").exec();
    if (req.user !== undefined && req.user.equals(review.author)) {
      await Campground.findByIdAndUpdate(req.params.id, {
        $pull: { reviews: req.params.review_id },
      });
      await Review.findByIdAndDelete(req.params.review_id);
      req.flash("success", "Successfully Deleted Review!");
      res.redirect(`/campgrounds/${req.params.id}`);
    } else {
      next(new AppError(403, "Access Denied"));
    }
  } catch (error) {
    next(error);
  }
};
