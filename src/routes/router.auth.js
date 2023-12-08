const express = require("express");
const {
  getAllUser,
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");
const router = express.Router();

// router.get("/users", getAllUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
