const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    createCommentService,
    getCommentsService,
    updateCommentService,
    deleteCommentService,
} = require("../services/comment.service");

// ======================================
// Create Comment
// ======================================

const createComment = asyncHandler(async (req, res) => {

    const comment = await createCommentService(
        req.user._id,
        req.params.postId,
        req.body.content
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Comment created successfully",
            comment
        )
    );

});

// ======================================
// Get Comments Of A Post
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
    updateComment,
    deleteComment,
};