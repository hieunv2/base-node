const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./token.service");

const createUser = async (data) => {
  return User.create({
    ...data,
    workRequest: [],
  });
};

const getListUser = async () => {
  return User.find({}).sort({ createAt: "desc" });
};

const findOneByEmail = async (email) => {
  return User.findOne({
    email,
  });
};

module.exports = {
  findOneByEmail,
  createUser,
  getListUser,
};
