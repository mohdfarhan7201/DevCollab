const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const ApiError = require("../utils/apiError");
const createNotification = require("./notification.helper");

// ======================================
// CREATE COMMENT / REPLY
// ======================================

const createCommentService = async ({
  userId,
  postId,
  content,
  parentComment = null,
}) => {
  if (!content || !content.trim()) {
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

  let parent = null;

  if (parentComment) {
    parent = await Comment.findById(parentComment);

    if (!parent) {
      throw new ApiError(
        404,
        "Parent comment not found"
      );
    }
  }

  const comment = await Comment.create({
    post: postId,
    user: userId,
    parentComment,
    content: content.trim(),
  });

  if (parent) {
    parent.repliesCount += 1;
    await parent.save();
  }

  const populatedComment =
    await Comment.findById(comment._id).populate(
      "user",
      "name username avatar"
    );

  const postOwner =
    post.user || post.author || post.owner;

  if (
    postOwner &&
    postOwner.toString() !== userId.toString()
  ) {
    await createNotification({
      recipient: postOwner,
      sender: userId,
      type: "comment",
      title: "New Comment",
      message: "commented on your post.",
    });
  }

  return populatedComment;
};

// ======================================
// GET POST COMMENTS
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
    parentComment: null,
    isDeleted: false,
  })
    .populate(
      "user",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    });
};

// ======================================
// GET REPLIES
// ======================================

const getRepliesService = async (
  commentId
) => {
  return await Comment.find({
    parentComment: commentId,
    isDeleted: false,
  })
    .populate(
      "user",
      "name username avatar"
    )
    .sort({
      createdAt: 1,
    });
};

// ======================================
// UPDATE COMMENT
// ======================================

const updateCommentService = async (
  commentId,
  userId,
  content
) => {
  if (!content || !content.trim()) {
    throw new ApiError(
      400,
      "Comment content is required"
    );
  }

  const comment =
    await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(
      404,
      "Comment not found"
    );
  }

  if (
    comment.user.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized"
    );
  }

  comment.content = content.trim();
  comment.isEdited = true;

  await comment.save();

  return await Comment.findById(
    comment._id
  ).populate(
    "user",
    "name username avatar"
  );
};

// ======================================
// DELETE COMMENT (SOFT DELETE)
// ======================================

const deleteCommentService = async (
  commentId,
  userId
) => {
  const comment =
    await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(
      404,
      "Comment not found"
    );
  }

  if (
    comment.user.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized"
    );
  }

  comment.isDeleted = true;
  comment.content = "This comment was deleted.";

  await comment.save();

  if (comment.parentComment) {
    await Comment.findByIdAndUpdate(
      comment.parentComment,
      {
        $inc: {
          repliesCount: -1,
        },
      }
    );
  }

  return true;
};

module.exports = {
  createCommentService,
  getCommentsService,
  getRepliesService,
  updateCommentService,
  deleteCommentService,
};