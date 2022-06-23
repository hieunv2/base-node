const APIError = require("../utils/AppError");
const { verifyToken } = require("../services/token.service");
const { User } = require("../models");

module.exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(403).send({ message: "Token not found." });
  } else {
    try {
      const token = authorization.split(" ")[1];
      const { id } = await verifyToken(token);
      console.log("id: " + id);
      const user = await User.findOne({ _id: id });

      if (!user) res.status(403).send({ message: "Forbidden" });
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(403).send({ message: "Forbidden" });
    }
  }
};
