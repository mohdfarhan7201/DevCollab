const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require("../controllers/post.controller");

// Create Post
router.post(
    "/",
    verifyJWT,
    upload.single("image"),
    createPost
);

// Get All Posts
router.get(
    "/",
    verifyJWT,
    getAllPosts
);

// Get Single Post
router.get(
    "/:postId",
    verifyJWT,
    getPostById
);

router.patch(
    "/:postId",
    verifyJWT,
    upload.single("image"),
    updatePost
);

router.delete(
    "/:postId",
    verifyJWT,
    deletePost
);

module.exports = router;