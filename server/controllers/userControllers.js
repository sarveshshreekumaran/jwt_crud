const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const createAccessToken = require("../utils/jwtToken");

const registerController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const alreadyRegistered = await User.findOne({ email });
    if (alreadyRegistered) {
      return res.status(409).json({ message: "User is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    const jwtAccessToken = createAccessToken(user._id);
    res.json({
      message: "User registered successfully",
      success: true,
      user,
      jwtAccessToken,
    });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const jwtAccessToken = createAccessToken(user._id);
      res.json({
        message: "User logged in successfully",
        success: true,
        jwtAccessToken,
      });
    } else {
      res.json({ Error: "Wrong credentials" });
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
};

module.exports = { registerController, loginController };
