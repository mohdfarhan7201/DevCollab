const Post = require("../models/post.model");
const ApiError = require("../utils/apiError");

const {
  uploadImage,
  deleteImage,
} = require("./cloudinary.service");

// ======================================
// CREATE POST
// ======================================

const createPostService = async (userId, data, file) => {
  const { content } = data;

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }

  let image = {
    url: "",
    public_id: "",
  };

  if (file) {
    const uploadedImage = await uploadImage(file.buffer);

    image = {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    };
  }

  const post = await Post.create({
    content,
    image,
    author: userId,
  });

  return await Post.findById(post._id)
    .populate("author", "name username avatar");
};

// ======================================
// GET ALL POSTS (FEED)
// ======================================

const getAllPostsService = async () => {
  return await Post.find()
    .populate("author", "name username avatar")
    .sort({ createdAt: -1 });
};

// ======================================
// GET SINGLE POST
// ======================================

const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId)
    .populate("author", "name username avatar");

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return post;
};

// ======================================
// UPDATE POST
// ======================================

const updatePostService = async (postId, userId, data, file) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized");
  }

  if (data.content) {
    post.content = data.content;
    post.isEdited = true;
  }

  if (file) {
    if (post.image?.public_id) {
      await deleteImage(post.image.public_id);
    }

    const uploadedImage = await uploadImage(file.buffer);

    post.image = {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    };
  }

  await post.save();

  return await Post.findById(post._id)
    .populate("author", "name username avatar");
};

// ======================================
// DELETE POST
// ======================================

const deletePostService = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized");
  }

  if (post.image?.public_id) {
    await deleteImage(post.image.public_id);
  }

  await post.deleteOne();

  return true;
};

// ======================================
// TOGGLE LIKE
// ======================================

const toggleLikeService = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.addToSet(userId);
  }

  await post.save();

  return {
    liked: !alreadyLiked,
    likesCount: post.likes.length,
  };
};

module.exports = {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
  deletePostService,
  toggleLikeService,
};