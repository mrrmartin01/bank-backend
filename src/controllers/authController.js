const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, address, phoneNumber } = req.body;
    const userExists = await User.findOne({ email });

    if (!email || !password || !firstName || !lastName || !address ||!phoneNumber) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        });
    }

    if (userExists)
      return res.status(400).json({ message: "User already exists" });


    const user = await User.create({ email, password, firstName, lastName, address, phoneNumber });
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
