const Joi = require("@hapi/joi");
const httpStatus = require("http-status");
const { pick } = require("lodash");
const AppError = require("../utils/AppError");
const { validationErrorWithData } = require("../utils/apiResponse");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);
  if (error) {
    console.log(error);
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return validationErrorWithData(res, errorMessage);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
