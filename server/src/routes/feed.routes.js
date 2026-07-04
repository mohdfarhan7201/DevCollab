const express = require("express");

const router = express.Router();

const verifyJWT =
require("../middlewares/auth.middleware");

const {

    getFeed,

} = require("../controllers/feed.controller");

router.get(

    "/",

    verifyJWT,

    getFeed

);

module.exports = router;