const User = require("../models/user.model");
const Follow = require("../models/follow.model");
const Project = require("../models/project.model");
const Post = require("../models/post.model");

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
// Get Profile
// ======================================================

const getProfileService = async (userId) => {
  return await getCurrentUserService(userId);
};

// ======================================================
// Get Public User By Id
// ======================================================

const getUserByIdService = async (
  userId,
  currentUserId
) => {
  const user = await User.findById(userId).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const [
    followers,
    following,
    projectsCount,
    postsCount,
  ] = await Promise.all([
    Follow.countDocuments({
      following: userId,
    }),

    Follow.countDocuments({
      follower: userId,
    }),

    Project.countDocuments({
      owner: userId,
    }),

    Post.countDocuments({
      author: userId,
    }),
  ]);

  let isFollowing = false;

  if (currentUserId) {
    const follow =
      await Follow.findOne({
        follower: currentUserId,
        following: userId,
      });

    isFollowing = !!follow;
  }

  return {
    ...user.toObject(),
    followers,
    following,
    projectsCount,
    postsCount,
    isFollowing,
  };
};

// ======================================================
// Get User By Username
// ======================================================

const getUserByUsernameService =
  async (username) => {
    const user =
      await User.findOne({
        username,
      }).select(
        "-password -refreshToken"
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  };

// ======================================================
// Update User Profile
// ======================================================

const updateUserProfileService =
  async (
    userId,
    updateData
  ) => {
    const allowedFields = [
      "name",
      "bio",
      "username",
      "location",
      "github",
      "linkedin",
      "portfolio",
      "skills",
    ];

    const updates = {};

    Object.keys(updateData).forEach(
      (key) => {
        if (
          allowedFields.includes(key)
        ) {
          updates[key] =
            updateData[key];
        }
      }
    );

    const user =
      await User.findByIdAndUpdate(
        userId,
        updates,
        {
          new: true,
          runValidators: true,
        }
      ).select(
        "-password -refreshToken"
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  };

// ======================================================
// Alias (Controller Compatibility)
// ======================================================

const updateProfileService =
  updateUserProfileService;

// ======================================================
// Update Avatar
// ======================================================

const updateAvatarService =
  async (userId, file) => {
    const user =
      await User.findById(userId);

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    user.avatar = {
      url: file.path || "",
      public_id:
        file.filename || "",
    };

    await user.save();

    return user;
  };

// ======================================================
// Search Users
// ======================================================

const searchUsersService =
  async (query) => {
    return await User.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          username: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).select(
      "-password -refreshToken"
    );
  };

// ======================================================
// Get All Users
// ======================================================

const getAllUsersService =
  async (
    page = 1,
    limit = 10
  ) => {
    page = Number(page);
    limit = Number(limit);

    const users =
      await User.find()
        .select(
          "-password -refreshToken"
        )
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({
          createdAt: -1,
        });

    const total =
      await User.countDocuments();

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(
          total / limit
        ),
      },
    };
  };

module.exports = {
  getCurrentUserService,
  getProfileService,
  getUserByIdService,
  getUserByUsernameService,
  updateUserProfileService,
  updateProfileService,
  updateAvatarService,
  searchUsersService,
  getAllUsersService,
};