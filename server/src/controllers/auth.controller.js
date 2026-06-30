const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    registerUserService,
    loginUserService,
} = require("../services/auth.service");

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

    const data = await loginUserService(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login successful",
            data
        )
    );

});

module.exports = {
    registerUser,
    loginUser,
};