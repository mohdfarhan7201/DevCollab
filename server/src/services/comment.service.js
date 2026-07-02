const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const ApiError = require("../utils/apiError");

// ======================================
// Create Comment
// ======================================

const createCommentService = async (
  userId,
  postId,
  content
) => {

  if (!content || content.trim() === "") {
    throw new ApiError(
      400,
      "Comment content is required"
    );
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(
      404,
      "Post not found"
    );
  }

  const comment = await Comment.create({
    content,
    author: userId,
    post: postId,
  });

  return await Comment.findById(comment._id)
    .populate(
      "author",
      "name username avatar"
    );
};

// ======================================
// Get All Comments Of A Post
// ======================================

const getCommentsService = async (
  postId
) => {

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(
      404,
      "Post not found"
    );
  }

  return await Comment.find({
    post: postId,
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
// Update Comment
// ======================================

const updateCommentService = async (
    commentId,
    userId,
    content
) => {

    if (!content || content.trim() === "") {
        throw new ApiError(
            400,
            "Comment content is required"
        );
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found"
        );
    }

    if (!comment.author.equals(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to update this comment"
        );
    }

    comment.content = content.trim();

    await comment.save();

    return await Comment.findById(comment._id)
        .populate(
            "author",
            "name username avatar"
        );
};


// ======================================
// Delete Comment
// ======================================

const deleteCommentService = async (
    commentId,
    userId
) => {

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found"
        );
    }

    if (!comment.author.equals(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to delete this comment"
        );
    }

    await comment.deleteOne();
};

module.exports = {
    createCommentService,
    getCommentsService,
    updateCommentService,
    deleteCommentService,
};