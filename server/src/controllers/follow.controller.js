const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    toggleFollowService,
    getFollowersService,
    getFollowingService,
} = require("../services/follow.service");

// ======================================
// Toggle Follow
// ======================================

const toggleFollow = asyncHandler(async (req, res) => {

    const result = await toggleFollowService(
        req.user._id,
        req.params.userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result.followed
                ? "User followed successfully"
                : "User unfollowed successfully",
            result
        )
    );

});

// ======================================
// Get Followers
// ======================================

const getFollowers = asyncHandler(async (req, res) => {

    const followers = await getFollowersService(
        req.params.userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Followers fetched successfully",
            followers
        )
    );

});

// ======================================
// Get Following
// ======================================

const getFollowing = asyncHandler(async (req, res) => {

    const following = await getFollowingService(
        req.params.userId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Following fetched successfully",
            following
        )
    );

});

module.exports = {
    toggleFollow,
    getFollowers,
    getFollowing,
};