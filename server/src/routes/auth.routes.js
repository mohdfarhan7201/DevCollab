const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {

    registerUser,

    loginUser,

    getCurrentUser,

} = require("../controllers/auth.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(

    "/me",

    verifyJWT,

    getCurrentUser

);

module.exports = router;