const User = require("../models/user.model");
const Project = require("../models/project.model");
const Post = require("../models/post.model");

// ======================================
// Search Users
// ======================================

const searchUsersService = async (keyword) => {

    return await User.find({

        $or: [

            {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },

            {
                username: {
                    $regex: keyword,
                    $options: "i",
                },
            },

        ],

    }).select("-password -refreshToken");

};

// ======================================
// Search Projects
// ======================================

const searchProjectsService = async (keyword) => {

    return await Project.find({

        $or: [

            {
                title: {
                    $regex: keyword,
                    $options: "i",
                },
            },

            {
                description: {
                    $regex: keyword,
                    $options: "i",
                },
            },

        ],

    }).populate(

        "owner",

        "name username avatar"

    );

};

// ======================================
// Search Posts
// ======================================

const searchPostsService = async (keyword) => {

    return await Post.find({

        content: {

            $regex: keyword,

            $options: "i",

        },

    }).populate(

        "author",

        "name username avatar"

    );

};

module.exports = {

    searchUsersService,

    searchProjectsService,

    searchPostsService,

};