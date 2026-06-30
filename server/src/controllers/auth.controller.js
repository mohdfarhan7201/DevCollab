const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  registerUserService,
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

module.exports = {
  registerUser,
};