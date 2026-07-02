const Post = require("../models/post.model");
const ApiError = require("../utils/apiError");

const {
    uploadImage,
} = require("./cloudinary.service");

// ==========================================
// Create Post
// ==========================================

const createPostService = async (
    userId,
    data,
    file
) => {

    const { content } = data;

    if (!content || content.trim() === "") {
        throw new ApiError(
            400,
            "Content is required"
        );
    }

    let image = {
        url: "",
        public_id: "",
    };

    if (file) {

        const uploadedImage =
            await uploadImage(file.buffer);

        image = {

            url: uploadedImage.secure_url,

            public_id: uploadedImage.public_id,

        };

    }

    const post = await Post.create({

        content,

        image,

        author: userId,

    });

    return await Post.findById(post._id)

        .populate(
            "author",
            "name username avatar"
        );

};

// ==========================================
// Get All Posts
// ==========================================

const getAllPostsService = async () => {

    return await Post.find()

        .populate(
            "author",
            "name username avatar"
        )

        .sort({
            createdAt: -1,
        });

};

// ==========================================
// Get Single Post
// ==========================================

const getPostByIdService = async (
    postId
) => {

    const post = await Post.findById(postId)

        .populate(
            "author",
            "name username avatar"
        );

    if (!post) {

        throw new ApiError(
            404,
            "Post not found"
        );

    }

    return post;

};

module.exports = {

    createPostService,

    getAllPostsService,

    getPostByIdService,

};