const express = require("express");
const validateReview = require("../schemas/validReview");
const isRegistered = require("../middleware/isRegistered");
const reviews = require("../controllers/review");

const router = express.Router();

router.post("/:id/reviews", isRegistered, validateReview, reviews.postReview);

router.delete("/:id/reviews/:review_id", reviews.deleteReview);

module.exports = router;
