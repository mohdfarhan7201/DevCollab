const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler=require("../utils/asyncHandler");

const ApiError=require("../utils/apiError");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Validation
    if (
      [name, username, email, password].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      throw new ApiError(

400,

"All fields are required"

);
    }

    // Check Email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new ApiError(

409,

"Email already exists"

);
    }

    // Check Username
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new ApiError(

409,

"Username already exists"

);
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Response Object
    const userResponse = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

        return res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        userResponse
      )
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(
        500,
        error.message || "Internal Server Error"
      )
    );
  }
});

module.exports = {
  registerUser,
};