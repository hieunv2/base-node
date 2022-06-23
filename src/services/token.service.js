const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const config = require("../config/config");
const AppError = require("../utils/AppError");

const generateToken = (
  id,
  expires = config.jwt.accessExpirationSeconds,
  secret = config.jwt.secret
) => {
  const payload = {
    id,
    iat: moment().unix(),
    exp: Math.floor(Date.now() / 1000) + expires,
  };
  return jwt.sign(payload, secret, { algorithm: "HS256" });
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  return payload;
};

module.exports = {
  generateToken,
  verifyToken,
};
