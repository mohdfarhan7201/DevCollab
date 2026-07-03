const Follow = require("../models/follow.model");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

// ======================================
// Toggle Follow
// ======================================

const toggleFollowService = async (
    followerId,
    followingId
) => {

    if (followerId.toString() === followingId.toString()) {
        throw new ApiError(
            400,
            "You cannot follow yourself"
        );
    }

    const user = await User.findById(followingId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    const existingFollow = await Follow.findOne({
        follower: followerId,
        following: followingId,
    });

    if (existingFollow) {

        await existingFollow.deleteOne();

        const followersCount = await Follow.countDocuments({
            following: followingId,
        });

        return {
            followed: false,
            followersCount,
        };

    }

    await Follow.create({
        follower: followerId,
        following: followingId,
    });

    const followersCount = await Follow.countDocuments({
        following: followingId,
    });

    return {
        followed: true,
        followersCount,
    };

};

// ======================================
// Get Followers
// ======================================

const getFollowersService = async (userId) => {

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
// Get Following
// ======================================

const getFollowingService = async (userId) => {

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