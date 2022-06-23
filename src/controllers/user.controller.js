const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const apiResponse = require("../utils/apiResponse");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../services/token.service");
const axios = require("axios");

const headers = {
  Authorization: process.env.DISCORD_TOKEN,
};

const createUser = catchAsync(async (req, res, next) => {
  const response = await userService.createUser(req.body);
  if (response) {
    const { data } = response;

    return apiResponse.successResponseWithData(
      res,
      "Create user successfully",
      response
    );
  }
  return apiResponse.ErrorResponse(res, "Create job fail");
});

const getListUser = catchAsync(async (req, res, next) => {
  const response = await userService.getListUser(req.query);
  if (response) {
    return apiResponse.successResponseWithData(
      res,
      "Get list user successfully",
      response
    );
  }
  return apiResponse.ErrorResponse(res, "Fail");
});

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findOneByEmail(email);
  if (!user) return apiResponse.ErrorResponse(res, "Email not found!");
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return apiResponse.ErrorResponse(res, "Password not correct!");
  }
  const token = await generateToken(user._id);
  return apiResponse.successResponseWithData(res, "Login successfully", token);
};

const profile = async (req, res) => {
  return apiResponse.successResponseWithData(res, "Success", req.user);
};

const getChannels = async (req, res) => {
  const { serverId } = req.body;
  let channels = [];

  try {
    const response = await axios.get(
      `https://discord.com/api/v8/guilds/${serverId}/channels`,
      { headers }
    );
    if (response.status === 200) {
      channels = response.data
        .filter((channel) => channel.type !== 2 && channel.type !== 4)
        .map((el) => {
          return { serverId: el.guild_id, name: el.name, channelId: el.id };
        });
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, "Get channels errors");
  }
  return apiResponse.successResponseWithData(res, "Success", channels);
};

module.exports = {
  login,
  profile,
  createUser,
  getListUser,
  getChannels,
};
