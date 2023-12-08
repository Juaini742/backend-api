const bcrypt = require("bcryptjs");

const passwordHasing = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

module.exports = passwordHasing;
