const errorHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = errorHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already registered");
  }

  const newUser = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occurred while creating user");
  }
});

const authUser = errorHandler(async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.comparePassword(password)) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email id or password");
  }
});


module.exports = {
  registerUser,
  authUser,
};
