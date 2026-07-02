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
    toggleLike,
} = require("../controllers/post.controller");

router.post(
    "/",
    verifyJWT,
    upload.single("image"),
    createPost
);

router.get(
    "/",
    verifyJWT,
    getAllPosts
);

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

router.patch(
    "/:postId/like",
    verifyJWT,
    toggleLike
);

module.exports = router;