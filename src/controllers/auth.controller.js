const {Users, User_details} = require("../db/models");
const isEmail = require("validator/lib/isEmail");
const passwordHasing = require("../utils/passwordHasing");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secretKey} = require("../utils/secretKey");

// exports.getAllUser = async (req, res) => {
//   try {
//     const user = await Users.findAll();
//     res.json(user);
//   } catch (error) {}
// };

exports.registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    if (!isEmail(email))
      return res.status(400).json({error: true, message: "Invalid Email"});
    const newPassword = await passwordHasing(password);
    const user = await Users.create({
      id: crypto.randomUUID(),
      username,
      email,
      password: newPassword,
    });
    res.status(201).json({username: user.username, email: user.email});
  } catch (error) {
    if (error.username === "SequelizeValidationError") {
      const errors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res
        .status(400)
        .json({errors: true, message: "Validations Error", errors});
    } else {
      res
        .status(500)
        .json({error: "Internal Server Error", message: error.message});
    }
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await Users.findOne({where: {email}});

    if (!user) return res.json({error: "User not found"});

    if (!bcrypt.compareSync(password, user.password))
      return res.json({message: "Email or Password is incorrect"});

    const token = jwt.sign({user_id: user.id}, secretKey, {expiresIn: "1h"});
    await User_details.create({
      id: crypto.randomUUID(),
      user_id: user.id,
      token,
    });

    res
      .status(200)
      .setHeader("access_token", `Bearer ${token}`)
      .json({success: true, message: "Login successfully"});
  } catch (error) {
    res
      .status(500)
      .json({error: "Internal Server Error", message: error.message});
  }
};

exports.logout = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const deletedRows = await User_details.destroy({
      where: {token: token.split(" ")[1]},
    });

    if (deletedRows > 0) {
      res.json({success: true, message: "Logout successful"});
    } else {
      res
        .status(404)
        .json({error: "User detail not found for the provided token"});
    }
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};
