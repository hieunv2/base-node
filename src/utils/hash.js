const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const comparePassword = (plainPassword, password) => {
  return bcrypt.compareSync(plainPassword, password);
};

module.exports = {
  hashPassword,
  comparePassword,
};
