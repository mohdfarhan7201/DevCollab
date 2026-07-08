const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");


const verifyJWT = asyncHandler(async (req, res, next) => {


    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace(
            "Bearer ",
            ""
        );


    if (!token) {

        throw new ApiError(
            401,
            "Unauthorized request"
        );

    }



    let decodedToken;

    try {
        decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
    } catch (err) {
        throw new ApiError(
            401,
            err.message === "jwt expired"
                ? "Access token expired"
                : "Invalid access token"
        );
    }



    const user = await User.findById(
        decodedToken.userId || decodedToken._id
    ).select(
        "-password -refreshToken"
    );



    if (!user) {

        throw new ApiError(
            401,
            "Invalid Access Token"
        );

    }



    req.user = user;


    next();


});



module.exports = verifyJWT;