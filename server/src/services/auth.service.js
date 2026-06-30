const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

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
    password, // Hash automatically by pre-save hook
  });

  // Fetch User Without Password
  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  return createdUser;
};




const loginUserService = async (loginData) => {

    const { email, password } = loginData;

    if (!email || !password) {
        throw new ApiError(400, "Email and Password are required");
    }

    const user = await User.findOne({
        $or: [
            { email },
            { username: email }
        ]
    }).select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return {
        user: {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        },
        accessToken,
        refreshToken,
    };

};

module.exports = {
  registerUserService,
  loginUserService,
};