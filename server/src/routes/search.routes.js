const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
    searchUsers,
    searchProjects,
    searchPosts,
} = require("../controllers/search.controller");

router.get(
    "/users",
    verifyJWT,
    searchUsers
);

router.get(
    "/projects",
    verifyJWT,
    searchProjects
);

router.get(
    "/posts",
    verifyJWT,
    searchPosts
);

module.exports = router;