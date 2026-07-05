const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

// ======================================================
// Get Current User Profile
// ======================================================

const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

// ======================================================
// Get User by Username
// ======================================================

const getUserByUsernameService = async (username) => {
  const user = await User.findOne({ username }).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

// ======================================================
// Update User Profile
// ======================================================

const updateUserProfileService = async (userId, updateData) => {
  const allowedFields = ["name", "bio", "avatar", "username"];

  const updates = {};

  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) {
      updates[key] = updateData[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    updates,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

module.exports = {
  getCurrentUserService,
  getUserByUsernameService,
  updateUserProfileService,
};