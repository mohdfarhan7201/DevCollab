const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  createPostService,
  getFeedService,
  getUserPostsService,
  getPostService,
  updatePostService,
  deletePostService,
  toggleLikeService,
} = require("../services/post.service");

// ======================================
// CREATE POST
// ======================================

const createPost = asyncHandler(async (req, res) => {
  const post = await createPostService(
    req.user._id,
    req.body
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
// GET FEED
// ======================================

const getFeed = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const posts = await getFeedService(
    page,
    limit
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Feed fetched successfully",
      posts
    )
  );
});

// ======================================
// GET USER POSTS
// ======================================

const getUserPosts = asyncHandler(async (req, res) => {
  const posts =
    await getUserPostsService(
      req.params.userId
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "User posts fetched successfully",
      posts
    )
  );
});

// ======================================
// GET SINGLE POST
// ======================================

const getPost = asyncHandler(async (req, res) => {
  const post = await getPostService(
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

// ======================================
// UPDATE POST
// ======================================

const updatePost = asyncHandler(async (req, res) => {
  const post =
    await updatePostService(
      req.params.postId,
      req.user._id,
      req.body
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Post updated successfully",
      post
    )
  );
});

// ======================================
// DELETE POST
// ======================================

const deletePost = asyncHandler(async (req, res) => {
  await deletePostService(
    req.params.postId,
    req.user._id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Post deleted successfully"
    )
  );
});

// ======================================
// TOGGLE LIKE
// ======================================

const toggleLike = asyncHandler(async (req, res) => {
  const result =
    await toggleLikeService(
      req.params.postId,
      req.user._id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Like updated successfully",
      result
    )
  );
});

module.exports = {
  createPost,
  getFeed,
  getUserPosts,
  getPost,
  updatePost,
  deletePost,
  toggleLike,
};