const User = require("../models/user.model");
const Project = require("../models/project.model");
const Post = require("../models/post.model");

// ======================================
// SEARCH USERS
// ======================================

const searchUsersService = async (
  keyword = ""
) => {
  keyword = keyword.trim();

  if (!keyword) {
    return [];
  }

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
      {
        bio: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        skills: {
          $elemMatch: {
            $regex: keyword,
            $options: "i",
          },
        },
      },
    ],
  })
    .select(
      "-password -refreshToken"
    )
    .sort({
      followersCount: -1,
      createdAt: -1,
    })
    .limit(20);
};

// ======================================
// SEARCH PROJECTS
// ======================================

const searchProjectsService =
  async (keyword = "") => {
    keyword = keyword.trim();

    if (!keyword) {
      return [];
    }

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
        {
          techStack: {
            $elemMatch: {
              $regex: keyword,
              $options: "i",
            },
          },
        },
      ],
    })
      .populate(
        "owner",
        "name username avatar"
      )
      .sort({
        createdAt: -1,
      })
      .limit(20);
  };

// ======================================
// SEARCH POSTS
// ======================================

const searchPostsService =
  async (keyword = "") => {
    keyword = keyword.trim();

    if (!keyword) {
      return [];
    }

    return await Post.find({
      isDeleted: false,
      visibility: "public",
      $or: [
        {
          content: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          tags: {
            $elemMatch: {
              $regex: keyword,
              $options: "i",
            },
          },
        },
      ],
    })
      .populate(
        "author",
        "name username avatar"
      )
      .sort({
        createdAt: -1,
      })
      .limit(20);
  };

module.exports = {
  searchUsersService,
  searchProjectsService,
  searchPostsService,
};