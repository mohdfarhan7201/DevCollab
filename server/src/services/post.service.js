const Post = require("../models/post.model");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const createNotification = require("./notification.helper");

// ======================================
// CREATE POST
// ======================================

const createPostService = async (
  userId,
  payload
) => {
  const {
    content = "",
    images = [],
    tags = [],
    visibility = "public",
  } = payload;

  if (
    !content.trim() &&
    images.length === 0
  ) {
    throw new ApiError(
      400,
      "Post cannot be empty"
    );
  }

  const post = await Post.create({
    author: userId,
    content: content.trim(),
    images,
    tags,
    visibility,
  });

  return await Post.findById(post._id)
    .populate(
      "author",
      "name username avatar"
    );
};

// ======================================
// GET FEED
// ======================================

const getFeedService = async (
  page = 1,
  limit = 10
) => {
  const skip =
    (page - 1) * limit;

  return await Post.find({
    isDeleted: false,
    visibility: "public",
  })
    .populate(
      "author",
      "name username avatar bio"
    )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);
};

// ======================================
// GET USER POSTS
// ======================================

const getUserPostsService = async (
  userId
) => {
  return await Post.find({
    author: userId,
    isDeleted: false,
  })
    .populate(
      "author",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    });
};

// ======================================
// GET SINGLE POST
// ======================================

const getPostService = async (
  postId
) => {
  const post =
    await Post.findOne({
      _id: postId,
      isDeleted: false,
    }).populate(
      "author",
      "name username avatar bio"
    );

  if (!post) {
    throw new ApiError(
      404,
      "Post not found"
    );
  }

  return post;
};

// ======================================
// UPDATE POST
// ======================================

const updatePostService = async (
  postId,
  userId,
  payload
) => {
  const post =
    await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new ApiError(
      404,
      "Post not found"
    );
  }

  if (
    post.author.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized"
    );
  }

  post.content =
    payload.content ??
    post.content;

  post.images =
    payload.images ??
    post.images;

  post.tags =
    payload.tags ??
    post.tags;

  post.visibility =
    payload.visibility ??
    post.visibility;

  post.isEdited = true;

  await post.save();

  return await Post.findById(post._id)
    .populate(
      "author",
      "name username avatar"
    );
};

// ======================================
// DELETE POST
// ======================================

const deletePostService = async (
  postId,
  userId
) => {
  const post =
    await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new ApiError(
      404,
      "Post not found"
    );
  }

  if (
    post.author.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized"
    );
  }

  post.isDeleted = true;

  await post.save();

  return true;
};

// ======================================
// TOGGLE LIKE
// ======================================

const toggleLikeService = async (
  postId,
  userId
) => {
  const post =
    await Post.findById(postId);

  if (!post || post.isDeleted) {
    throw new ApiError(
      404,
      "Post not found"
    );
  }

  const index =
    post.likes.findIndex(
      (id) =>
        id.toString() ===
        userId.toString()
    );

  let liked = false;

  if (index >= 0) {
    post.likes.splice(index, 1);
  } else {
    post.likes.push(userId);
    liked = true;

    if (
      post.author.toString() !==
      userId.toString()
    ) {
     await createNotification({
  recipient: post.author,
  sender: userId,
  type: "like",
  title: "New Like",
  message: "liked your post.",
  metadata: {
    post: post._id,
  },
  link: `/dashboard/feed/${post._id}`,
});
    }
  }

  post.likesCount =
    post.likes.length;

  await post.save();

  return {
    liked,
    likesCount:
      post.likesCount,
  };
};

module.exports = {
  createPostService,
  getFeedService,
  getUserPostsService,
  getPostService,
  updatePostService,
  deletePostService,
  toggleLikeService,
};