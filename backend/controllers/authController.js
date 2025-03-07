// backend/controllers/authController.js
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  const { name, email, password, interests } = req.body;
  try {
    console.log("Signup Request:", req.body);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({
      name,
      email,
      password,
      interests: interests || [],
    });
    await user.save();

    const token = generateToken(user);
    res
      .status(201)
      .json({ token, user: { id: user._id, name, email, interests } });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res
        .status(400)
        .json({ message: "Invalid email or use Google login" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email, interests: user.interests },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const googleCallback = (req, res) => {
  const user = req.user;
  const token = generateToken(user);
  res.redirect(
    `${
      process.env.FRONTEND_URL
    }/auth/google/success?token=${token}&user=${encodeURIComponent(
      JSON.stringify({ id: user._id, name: user.name, email: user.email })
    )}`
  );
};

module.exports = { signup, login, googleCallback };
