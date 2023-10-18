const mongoose = require("mongoose");
const Review = require("./review");
const { required } = require("joi");
const { Schema } = mongoose;

const imageSchema = new Schema({
  path: String,
  filename: String,
});

imageSchema.virtual("thumbnail").get(function () {
  return this.path.replace("/upload", "/upload/w_200");
});

const options = { toJSON: { virtuals: true } };
const campgroundSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
      min: 0,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Location is required!"],
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [imageSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: false,
      },
    ],
  },
  options
);

campgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong><p>${this.location}</p>`;
});

campgroundSchema.post("findOneAndDelete", async function (campground) {
  if (campground.reviews.length) {
    await Review.deleteMany({
      _id: {
        $in: campground.reviews,
      },
    });
  }
});

const Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;
