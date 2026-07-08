const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  updateAvatar,
  getProfile,
  updateProfile,
  searchUsers,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");

// ======================================================
// Avatar Upload
// ======================================================

router.patch(
  "/avatar",
  verifyJWT,
  upload.single("avatar"),
  updateAvatar
);

// ======================================================
// Profile (current user)
// ======================================================

router.get(
  "/profile",
  verifyJWT,
  getProfile
);

router.patch(
  "/profile",
  verifyJWT,
  updateProfile
);

// ======================================================
// Search Users
// ======================================================

router.get(
  "/search",
  verifyJWT,
  searchUsers
);

// ======================================================
// Get User By Id
// ======================================================

router.get(
  "/:userId",
  verifyJWT,
  getUserById
);

// ======================================================
// Get All Users
// ======================================================

router.get(
  "/",
  verifyJWT,
  getAllUsers
);

module.exports = router;