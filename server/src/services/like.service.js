const Project = require("../models/project.model");
const ApiError = require("../utils/apiError");

const toggleLikeService = async (
    projectId,
    userId
) => {

    const project =
        await Project.findById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            "Project not found"
        );
    }

    const alreadyLiked =
        project.likes.includes(userId);

    if (alreadyLiked) {

        project.likes.pull(userId);

    } else {

        project.likes.push(userId);

    }

    await project.save();

    return {

        liked: !alreadyLiked,

        likesCount:
            project.likes.length,

    };

};

module.exports = {

    toggleLikeService,

};