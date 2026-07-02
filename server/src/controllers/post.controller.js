
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    createPostService,
    getAllPostsService,
    getPostByIdService,
    updatePostService,
    deletePostService,
} = require("../services/post.service");

// ======================================
// Create Post
// ======================================

const createPost = asyncHandler(async (req, res) => {

    const post = await createPostService(
        req.user._id,
        req.body,
        req.file
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Post created successfully",
            post
        )
    );

});

// ======================================
// Get All Posts
// ======================================

const getAllPosts = asyncHandler(async (req, res) => {

    const posts = await getAllPostsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Posts fetched successfully",
            posts
        )
    );

});

// ======================================
// Get Single Post
// ======================================

const getPostById = asyncHandler(async (req, res) => {

    const post = await getPostByIdService(
        req.params.postId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Post fetched successfully",
            post
        )
    );

});



const updatePost = asyncHandler(async (req, res) => {

    const post = await updatePostService(
        req.params.postId,
        req.user._id,
        req.body,
        req.file
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Post updated successfully",
            post
        )
    );

});



const deletePost = asyncHandler(async (req, res) => {

    await deletePostService(
        req.params.postId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Post deleted successfully",
            {}
        )
    );

});


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};