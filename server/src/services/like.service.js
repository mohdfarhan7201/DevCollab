const Project = require("../models/project.model");
const ApiError = require("../utils/apiError");
const createNotification = require("./notification.helper");

const toggleLikeService = async (
  projectId,
  userId
) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  const alreadyLiked = project.likes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyLiked) {
    // Unlike
    project.likes.pull(userId);
  } else {
    // Like
    project.likes.push(userId);

    // Don't notify yourself
    if (
      project.owner &&
      project.owner.toString() !== userId.toString()
    ) {
      await createNotification({
        recipient: project.owner,
        sender: userId,
        type: "like",
        title: "New Like",
        message: "liked your project.",
        reference: project._id,
      });
    }
  }

  await project.save();

  return {
    liked: !alreadyLiked,
    likesCount: project.likes.length,
  };
};

module.exports = {
  toggleLikeService,
};