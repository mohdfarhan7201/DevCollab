const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    registerUserService,
    loginUserService,
} = require("../services/auth.service");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};

const registerUser = asyncHandler(async (req, res) => {

    const user = await registerUserService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            user
        )
    );

});

const loginUser = asyncHandler(async (req, res) => {

    const { user, accessToken, refreshToken } =
        await loginUserService(req.body);

    return res
        .status(200)
        .cookie(
            "accessToken",
            accessToken,
            cookieOptions
        )
        .cookie(
            "refreshToken",
            refreshToken,
            cookieOptions
        )
        .json(
            new ApiResponse(
                200,
                "Login successful",
                {
                    user,
                    accessToken,
                    refreshToken,
                }
            )
        );

});

const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(

        new ApiResponse(

            200,

            "Current user fetched successfully",

            req.user

        )

    );

});

module.exports = {

    registerUser,

    loginUser,

    getCurrentUser,

};