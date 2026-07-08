const Follow = require("../models/follow.model");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const createNotification = require("./notification.helper");

// ======================================
// Toggle Follow
// ======================================

const toggleFollowService = async (
  followerId,
  followingId
) => {
  if (
    followerId.toString() ===
    followingId.toString()
  ) {
    throw new ApiError(
      400,
      "You cannot follow yourself"
    );
  }

  const user = await User.findById(
    followingId
  );

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const existingFollow =
    await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

  // ======================================
  // UNFOLLOW
  // ======================================

  if (existingFollow) {
    await existingFollow.deleteOne();

    const followersCount =
      await Follow.countDocuments({
        following: followingId,
      });

    return {
      followed: false,
      followersCount,
    };
  }

  // ======================================
  // FOLLOW
  // ======================================

  await Follow.create({
    follower: followerId,
    following: followingId,
  });

  // ======================================
  // CREATE NOTIFICATION
  // ======================================

  await createNotification({
    recipient: followingId,
    sender: followerId,

    type: "follow",

    title: "New Follower",

    message: "started following you.",

    metadata: {},
  });

  const followersCount =
    await Follow.countDocuments({
      following: followingId,
    });

  return {
    followed: true,
    followersCount,
  };
};

// ======================================
// GET FOLLOWERS
// ======================================

const getFollowersService = async (
  userId
) => {
  return await Follow.find({
    following: userId,
  })
    .populate(
      "follower",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    });
};

// ======================================
// GET FOLLOWING
// ======================================

const getFollowingService = async (
  userId
) => {
  return await Follow.find({
    follower: userId,
  })
    .populate(
      "following",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    });
};

module.exports = {
  toggleFollowService,
  getFollowersService,
  getFollowingService,
};