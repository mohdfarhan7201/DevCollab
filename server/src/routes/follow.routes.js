const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
    toggleFollow,
    getFollowers,
    getFollowing,
} = require("../controllers/follow.controller");

router.patch(
    "/:userId",
    verifyJWT,
    toggleFollow
);

router.get(
    "/followers/:userId",
    verifyJWT,
    getFollowers
);

router.get(
    "/following/:userId",
    verifyJWT,
    getFollowing
);

module.exports = router;