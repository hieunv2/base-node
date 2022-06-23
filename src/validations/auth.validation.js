const Joi = require("@hapi/joi");

const login = {
  body: Joi.object().keys({
    email: Joi.string()
      .min(3)
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
  }),
};

module.exports = {
  login,
};
