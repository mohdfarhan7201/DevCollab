const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const generateAccessAndRefreshTokens = require("../utils/generateTokens");

// ==========================
// Register User Service
// ==========================
const registerUserService = async (userData) => {
  const { name, username, email, password } = userData;

  // Validation
  if (
    [name, username, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check Existing User
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(409, "Email already exists");
    }

    if (existingUser.username === username) {
      throw new ApiError(409, "Username already exists");
    }
  }

  // Create User
  const user = await User.create({
    name,
    username,
    email,
    password, // Password automatically hashed by pre-save hook
  });

  // Fetch User without password & refreshToken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  return createdUser;
};

// ==========================
// Login User Service
// ==========================
const loginUserService = async (loginData) => {
  const { email, password } = loginData;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, "Email/Username and Password are required");
  }

  // Find User using Email OR Username
  const user = await User.findOne({
    $or: [{ email }, { username: email }],
  }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check Password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate Tokens
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  // Remove sensitive fields before sending response
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return {
    user: loggedInUser,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  registerUserService,
  loginUserService,
};