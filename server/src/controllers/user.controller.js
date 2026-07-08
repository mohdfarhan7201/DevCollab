const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  updateAvatarService,
  getProfileService,
  updateProfileService,
  searchUsersService,
  getAllUsersService,
  getUserByIdService,
} = require("../services/user.service");

// ======================================================
// Get Profile
// ======================================================

const getProfile = asyncHandler(async (req, res) => {
  const user = await getProfileService(req.user._id);

  return res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully", user)
  );
});

// ======================================================
// Update Profile
// ======================================================

const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await updateProfileService(
    req.user._id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(200, "Profile updated successfully", updatedUser)
  );
});

// ======================================================
// Update Avatar
// ======================================================

const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json(
      new ApiResponse(400, "Avatar file is required")
    );
  }

  const updatedUser = await updateAvatarService(
    req.user._id,
    req.file
  );

  return res.status(200).json(
    new ApiResponse(200, "Avatar updated successfully", updatedUser)
  );
});

// ======================================================
// Search Users
// ======================================================

const searchUsers = asyncHandler(async (req, res) => {
  const users = await searchUsersService(req.query.q || "");

  return res.status(200).json(
    new ApiResponse(200, "Users fetched successfully", users)
  );
});

// ======================================================
// Get User By Id
// ======================================================

const getUserById = asyncHandler(
  async (req, res) => {

    const user =
      await getUserByIdService(
        req.params.userId,
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "User fetched successfully",
        user
      )
    );
  }
);

// ======================================================
// Get All Users
// ======================================================

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const result = await getAllUsersService(page, limit);

  return res.status(200).json(
    new ApiResponse(200, "Users fetched successfully", result)
  );
});

module.exports = {
  updateAvatar,
  getProfile,
  updateProfile,
  searchUsers,
  getAllUsers,
  getUserById,
};