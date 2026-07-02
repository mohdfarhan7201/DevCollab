const express = require("express");

const router = express.Router({ mergeParams: true });

const verifyJWT = require("../middlewares/auth.middleware");

const {
    createComment,
    getComments,
    updateComment,
    deleteComment,
} = require("../controllers/comment.controller");

// Create Comment
router.post(
    "/",
    verifyJWT,
    createComment
);

// Get All Comments of a Post
router.get(
    "/",
    verifyJWT,
    getComments
);


router.patch(
    "/:commentId",
    verifyJWT,
    updateComment
);

router.delete(
    "/:commentId",
    verifyJWT,
    deleteComment
);

module.exports = router;