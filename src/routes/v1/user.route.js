const express = require("express");
const validate = require("../../middlewares/validate");
const { userController } = require("./../../controllers");
const authValidation = require("../../validations/auth.validation");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(userController.getListUser)
  .post(userController.createUser);

router.route("/get-channels").get(userController.getChannels);

router
  .route("/login")
  .post(validate(authValidation.login), userController.login);

router.route("/profile").get(auth, userController.profile);

module.exports = router;
