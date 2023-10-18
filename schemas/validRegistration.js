const Joi = require("joi");

const validateUserRegistration = (req, res, next) => {
  const userRegistrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string(),
  });
  const validateUser = userRegistrationSchema.validate(req.body);
  if (validateUser.error) {
    req.flash("error", validateUser.error.message);
    res.redirect("/register");
  } else {
    next();
  }
};

module.exports = validateUserRegistration;
