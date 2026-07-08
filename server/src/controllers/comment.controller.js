const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  createCommentService,
  getCommentsService,
  getRepliesService,
  updateCommentService,
  deleteCommentService,
} = require("../services/comment.service");

// ======================================
// CREATE COMMENT / REPLY
// ======================================

const createComment = asyncHandler(async (req, res) => {
  const comment = await createCommentService({
    userId: req.user._id,
    postId: req.params.postId,
    content: req.body.content,
    parentComment: req.body.parentComment || null,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      "Comment created successfully",
      comment
    )
  );
});

// ======================================
// GET COMMENTS
// ======================================

const getComments = asyncHandler(async (req, res) => {
  const comments = await getCommentsService(
    req.params.postId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Comments fetched successfully",
      comments
    )
  );
});

// ======================================
// GET REPLIES
// ======================================

const getReplies = asyncHandler(async (req, res) => {
  const replies = await getRepliesService(
    req.params.commentId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Replies fetched successfully",
      replies
    )
  );
});

// ======================================
// UPDATE COMMENT
// ======================================

const updateComment = asyncHandler(async (req, res) => {
  const comment = await updateCommentService(
    req.params.commentId,
    req.user._id,
    req.body.content
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Comment updated successfully",
      comment
    )
  );
});

// ======================================
// DELETE COMMENT
// ======================================

const deleteComment = asyncHandler(async (req, res) => {
  await deleteCommentService(
    req.params.commentId,
    req.user._id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Comment deleted successfully"
    )
  );
});

module.exports = {
  createComment,
  getComments,
  getReplies,
  updateComment,
  deleteComment,
};