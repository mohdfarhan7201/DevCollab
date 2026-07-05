const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// Comment routes (nested under posts)
const commentRoutes = require("./comment.routes");

// Controllers
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
} = require("../controllers/post.controller");

// ======================================
// CREATE POST
// ======================================

router.post(
  "/",
  verifyJWT,
  upload.single("image"),
  createPost
);

// ======================================
// GET ALL POSTS (FEED)
// ======================================

router.get(
  "/",
  verifyJWT,
  getAllPosts
);

// ======================================
// GET SINGLE POST
// ======================================

router.get(
  "/:postId",
  verifyJWT,
  getPostById
);

// ======================================
// UPDATE POST
// ======================================

router.patch(
  "/:postId",
  verifyJWT,
  upload.single("image"),
  updatePost
);

// ======================================
// DELETE POST
// ======================================

router.delete(
  "/:postId",
  verifyJWT,
  deletePost
);

// ======================================
// LIKE / UNLIKE POST
// ======================================

router.patch(
  "/:postId/like",
  verifyJWT,
  toggleLike
);

// ======================================
// COMMENTS (NESTED ROUTES)
// ======================================

router.use(
  "/:postId/comments",
  commentRoutes
);

module.exports = router;