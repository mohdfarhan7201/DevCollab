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

const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

// Public Routes

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

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