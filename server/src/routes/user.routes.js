const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    updateAvatar,
    getProfile,
    updateProfile,
    searchUsers,
    getAllUsers,
} = require("../controllers/user.controller");

// Avatar
router.patch(
    "/avatar",
    verifyJWT,
    upload.single("avatar"),
    updateAvatar
);

// Profile
router.get(
    "/profile",
    verifyJWT,
    getProfile
);

router.patch(
    "/profile",
    verifyJWT,
    updateProfile
);

router.get(
    "/search",
    verifyJWT,
    searchUsers
);

router.get(
    "/",
    verifyJWT,
    getAllUsers
);

module.exports = router;