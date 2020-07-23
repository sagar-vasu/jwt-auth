const express = require("express");
const router = express.Router();
const User = require("../modal/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Valdation
const {
  registerValidation,
  loginValidation,
} = require("../middelwares/validation");

// Register
router.post("/register", async (req, res) => {
  // lets validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if email exsit
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  // lets validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // if user exsit
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");
  // password matching
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  // create and assign token

  const token = jwt.sign({ _id: user._id }, "secertkey");
  res.header("auth-token", token).send(token);
  // res.send(user);
});

module.exports = router;
