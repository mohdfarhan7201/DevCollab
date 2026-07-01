const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  registerUserService,
  loginUserService,
  logoutUserService,
  refreshAccessTokenService,
} = require("../services/auth.service");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ======================================================
// Register
// ======================================================

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

// ======================================================
// Login
// ======================================================

const loginUser = asyncHandler(async (req, res) => {

  const { user, accessToken, refreshToken } =
    await loginUserService(req.body);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
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

// ======================================================
// Logout
// ======================================================

const logoutUser = asyncHandler(async (req, res) => {

  await logoutUserService(req.user._id);

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new ApiResponse(
        200,
        "Logout successful"
      )
    );

});

// ======================================================
// Refresh Token
// ======================================================

const refreshAccessToken = asyncHandler(async (req, res) => {

  const incomingRefreshToken =
    req.cookies.refreshToken ||
    req.body.refreshToken;

  const { accessToken, refreshToken } =
    await refreshAccessTokenService(
      incomingRefreshToken
    );

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
        "Access token refreshed successfully",
        {
          accessToken,
          refreshToken,
        }
      )
    );

});

// ======================================================
// Current User
// ======================================================

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

  logoutUser,

  refreshAccessToken,

  getCurrentUser,

};