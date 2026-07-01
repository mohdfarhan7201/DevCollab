const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

const {
    uploadImage,
    deleteImage,
} = require("./cloudinary.service");

const updateAvatarService = async (userId, file) => {

    if (!file) {
        throw new ApiError(400, "Avatar is required");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Delete old avatar if exists
    if (user.avatar.public_id) {
        await deleteImage(user.avatar.public_id);
    }

    // Upload new avatar
    const uploadedImage = await uploadImage(file.buffer);

    user.avatar = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
    };

    await user.save();

    return await User.findById(userId)
        .select("-password -refreshToken");

};


// ======================================================
// Get Current User Profile
// ======================================================

const getProfileService = async (userId) => {

    const user = await User.findById(userId)
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

// ======================================================
// Update User Profile
// ======================================================

const updateProfileService = async (userId, updateData) => {

    const { name,
    bio,
    skills,
    location,
    github,
    linkedin,
    portfolio, } = updateData;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (name) user.name = name.trim();

    if (bio !== undefined) user.bio = bio.trim();

    if (skills) {

        if (!Array.isArray(skills)) {
            throw new ApiError(400, "Skills must be an array");
        }

        user.skills = skills;
    }

    if (location !== undefined)
    user.location = location.trim();

if (github !== undefined)
    user.github = github.trim();

if (linkedin !== undefined)
    user.linkedin = linkedin.trim();

if (portfolio !== undefined)
    user.portfolio = portfolio.trim();

    await user.save();

    return await User.findById(userId)
        .select("-password -refreshToken");

};


// ======================================================
// Search Users
// ======================================================

const searchUsersService = async (query) => {

    if (!query || query.trim() === "") {
        throw new ApiError(400, "Search query is required");
    }

    const users = await User.find({

        $or: [

            {
                name: {
                    $regex: query,
                    $options: "i",
                },
            },

            {
                username: {
                    $regex: query,
                    $options: "i",
                },
            },

        ],

    }).select("-password -refreshToken");

    return users;

};


const getAllUsersService = async (page = 1, limit = 10) => {

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const users = await User.find()
        .select("name username avatar bio skills")
        .skip(skip)
        .limit(limit);

    const totalUsers = await User.countDocuments();

    return {
        users,
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
    };

};

module.exports = {
    updateAvatarService,
    getProfileService,
    updateProfileService,
    searchUsersService,
    getAllUsersService,
};