const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

const followUserService = async (
    currentUserId,
    targetUserId
) => {

    if (currentUserId.toString() === targetUserId) {
        throw new ApiError(
            400,
            "You cannot follow yourself"
        );
    }

    const currentUser = await User.findById(currentUserId);

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    const alreadyFollowing =
        currentUser.following.includes(targetUserId);

    if (alreadyFollowing) {
        throw new ApiError(
            400,
            "Already following"
        );
    }

    currentUser.following.push(targetUserId);

    targetUser.followers.push(currentUserId);

    await currentUser.save();

    await targetUser.save();

    return true;

};

module.exports = {

    followUserService,

};