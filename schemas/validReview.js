const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const validateReview = (req, res, next) => {
  const reviewSchema = Joi.object({
    body: Joi.string().optional().escapeHTML(),
    rating: Joi.number().required().min(1).max(5),
  });
  const result = reviewSchema.validate(req.body);
  result.error ? next(new AppError(400, result.error.message)) : next();
};

module.exports = validateReview;
