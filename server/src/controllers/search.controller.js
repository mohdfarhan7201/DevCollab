const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    searchUsersService,
    searchProjectsService,
    searchPostsService,
} = require("../services/search.service");

// ======================================
// Search Users
// ======================================

const searchUsers = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword || "";

    const users = await searchUsersService(keyword);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Users fetched successfully",
            users
        )
    );

});

// ======================================
// Search Projects
// ======================================

const searchProjects = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword || "";

    const projects = await searchProjectsService(keyword);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Projects fetched successfully",
            projects
        )
    );

});

// ======================================
// Search Posts
// ======================================

const searchPosts = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword || "";

    const posts = await searchPostsService(keyword);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Posts fetched successfully",
            posts
        )
    );

});

module.exports = {
    searchUsers,
    searchProjects,
    searchPosts,
};