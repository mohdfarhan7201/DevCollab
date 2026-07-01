const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    updateAvatarService,
    getProfileService,
    updateProfileService,
    searchUsersService,
    getAllUsersService,
} = require("../services/user.service");

// ======================================================
// Get Profile
// ======================================================

const getProfile = asyncHandler(async (req, res) => {

    const user = await getProfileService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched successfully",
            user
        )
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
        new ApiResponse(
            200,
            "Profile updated successfully",
            updatedUser
        )
    );

});

const updateAvatar = asyncHandler(async (req, res) => {

  const updatedUser = await updateAvatarService(
    req.user._id,
    req.file
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Avatar updated successfully",
      updatedUser
    )
  );

});


const searchUsers = asyncHandler(async (req, res) => {

    const users = await searchUsersService(req.query.q);

    return res.status(200).json(

        new ApiResponse(

            200,

            "Users fetched successfully",

            users

        )

    );

});

const getAllUsers = asyncHandler(async (req, res) => {

    const { page, limit } = req.query;

    const result = await getAllUsersService(page, limit);

    return res.status(200).json(

        new ApiResponse(

            200,

            "Users fetched successfully",

            result

        )

    );

});

module.exports = {
    updateAvatar,
    getProfile,
    updateProfile,
    searchUsers,
    getAllUsers,
};