const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapboxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapboxToken });
module.exports.index = async (req, res, next) => {
  try {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  } catch (error) {
    next(error);
  }
};

module.exports.createCampgroundPage = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
  try {
    const geoData = await geocodingClient
      .forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
      .send();
    const newCamp = new Campground(req.body);
    newCamp.geometry = geoData.body.features[0].geometry;
    newCamp.images = req.files.map((file) => ({
      path: file.path,
      filename: file.filename,
    }));
    newCamp.author = req.user;
    await newCamp.save();
    req.flash("success", "New Campground Added!");
    res.redirect(`/campgrounds/${newCamp._id}`);
  } catch (error) {
    next(error);
  }
};

module.exports.showCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findById(id)
      .populate("author")
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .exec();
    if (!campground) {
      req.flash("error", "Sorry! Can't find that campground! :(");
      res.redirect("/campgrounds");
    }
    const { author, reviews } = campground;
    res.render("campgrounds/show", {
      campground,
      author,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.showEditCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findById(id)
      .then((data) => data)
      .catch((err) => err);
    res.render("campgrounds/edit", { campground });
  } catch (error) {
    next(error);
  }
};

module.exports.editCampground = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { id } = req.params;
    const updateDetails = req.body;
    const campground = await Campground.findByIdAndUpdate(id, updateDetails, {
      runValidators: true,
    });
    const newImgDetails = req.files.map((img) => ({
      path: img.path,
      filename: img.filename,
    }));
    campground.images.push(...newImgDetails);
    await campground.save();
    if (req.body.deleteImgs) {
      for (let filename of req.body.deleteImgs) {
        await cloudinary.uploader.destroy(filename);
      }
      await campground.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImgs } } },
      });
    }
    req.flash("success", "Campground Updated Successfully!");
    res.redirect(`/campgrounds/${id}`);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Campground Deleted Successfully!");
    res.redirect("/campgrounds");
  } catch (error) {
    next(error);
  }
};
