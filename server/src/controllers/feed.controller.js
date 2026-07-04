const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    getFeedService,
} = require("../services/feed.service");

const getFeed = asyncHandler(async (req, res) => {

    const posts = await getFeedService(
        req.user._id,
        req.query
    );

    return res.status(200).json(

        new ApiResponse(

            200,

            "Feed fetched successfully",

            posts

        )

    );

});

module.exports = {

    getFeed,

};