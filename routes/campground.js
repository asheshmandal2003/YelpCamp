const express = require("express");
const validateCampground = require("../schemas/validSchema");
const isRegistered = require("../middleware/isRegistered");
const wrapRoute = require("../middleware/wrapRoute");
const campground = require("../controllers/campground");
const multer = require("multer");
const { storage } = require("../cloudinary");

const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .get(campground.index)
  .post(
    isRegistered,
    upload.array("image"),
    validateCampground,
    campground.createCampground
  );

router.get("/new", isRegistered, campground.createCampgroundPage);

router
  .route("/:id")
  .get(campground.showCampground)
  .put(
    wrapRoute,
    upload.array("image"),
    validateCampground,
    campground.editCampground
  )
  // .put(upload.array("image"), (req, res) => {
  //   console.log(req.body, req.files);
  //   res.send("ok");
  // })
  .delete(wrapRoute, campground.deleteCampground);

router.get("/:id/edit", wrapRoute, campground.showEditCampground);

module.exports = router;
