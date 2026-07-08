const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
  createPost,
  getFeed,
  getUserPosts,
  getPost,
  updatePost,
  deletePost,
  toggleLike,
} = require("../controllers/post.controller");

// ======================================
// PUBLIC ROUTES
// ======================================

// Feed
router.get("/", getFeed);

// Single Post
router.get("/:postId", getPost);

// User Posts
router.get("/user/:userId", getUserPosts);

// ======================================
// PROTECTED ROUTES
// ======================================

router.use(verifyJWT);

// Create Post
router.post("/", createPost);

// Update Post
router.patch("/:postId", updatePost);

// Delete Post
router.delete("/:postId", deletePost);

// Like / Unlike
router.patch("/:postId/like", toggleLike);

module.exports = router;