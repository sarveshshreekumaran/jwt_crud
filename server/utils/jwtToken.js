require("dotenv").config();
const jwt = require("jsonwebtoken");

const createAccessToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.PRIVITE_ACCESS_KEY, {
    expiresIn: "30m",
  });
};

module.exports = createAccessToken;
