require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const verifyAccessJwt = (req, res, next) => {
  let accessToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = req.headers.authorization.split(" ")[1]; //Bearer jwtToken
    jwt.verify(accessToken, process.env.PRIVITE_ACCESS_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ Error: err.message });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.json({ message: "Token is not provided" });
  }
};

const verifyRefreshJwt = (req, res, next) => {
  let refreshToken;
  if (req.cookies && req.cookies.refreshtoken) {
    refreshToken = req.cookies.refreshtoken;
    jwt.verify(
      refreshToken,
      process.env.PRIVITE_REFRESH_KEY,
      async (err, decoded) => {
        if (err) {
          res.status(401).json({ Error: err.message });
        } else {
          const user = await User.findOne({ refreshtoken: refreshToken });
          if (!user) {
            res.status(401).json({ message: "User not authorized" });
          }
          req.user = decoded;
          next();
        }
      }
    );
  } else {
    return res.json({ message: "RefreshToken is not provided" });
  }
};

module.exports = { verifyAccessJwt, verifyRefreshJwt };
