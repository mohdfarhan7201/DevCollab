const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const generateAccessAndRefreshTokens = require("../utils/generateTokens");

// ======================================================
// Register User
// ======================================================

const registerUserService = async (userData) => {
  const { name, username, email, password } = userData;

  if (
    [name, username, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(409, "Email already exists");
    }
    throw new ApiError(409, "Username already exists");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  return createdUser;
};

// ======================================================
// Login User
// ======================================================

const loginUserService = async (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username: email }],
  }).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  // 🔥 IMPORTANT: store refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return {
    user: loggedInUser,
    accessToken,
    refreshToken,
  };
};

// ======================================================
// Logout User
// ======================================================

const logoutUserService = async (userId) => {
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
};

// ======================================================
// Refresh Access Token
// ======================================================

const refreshAccessTokenService = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token expired or reused");
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    // 🔥 rotate refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
};

module.exports = {
  registerUserService,
  loginUserService,
  logoutUserService,
  refreshAccessTokenService,
};