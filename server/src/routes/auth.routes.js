const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} = require("../controllers/auth.controller");

// Public Routes

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh-token", refreshAccessToken);

// Protected Routes

router.post(
  "/logout",
  verifyJWT,
  logoutUser
);

router.get(
  "/me",
  verifyJWT,
  getCurrentUser
);

module.exports = router;