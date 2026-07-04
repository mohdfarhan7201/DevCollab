const Follow = require("../models/follow.model");
const Post = require("../models/post.model");

const getFeedService = async (userId, query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const following = await Follow.find({
        follower: userId,
    }).select("following");

    const followingIds = following.map(item => item.following);

    let filter = {};

    // If user follows someone, show only their posts
    if (followingIds.length > 0) {
        filter.author = {
            $in: followingIds,
        };
    }

    // Otherwise show latest posts
    const posts = await Post.find(filter)
        .populate(
            "author",
            "name username avatar"
        )
        .sort({
            createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    return posts;
};

module.exports = {
    getFeedService,
};