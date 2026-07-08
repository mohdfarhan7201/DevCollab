const Project = require("../models/project.model");
const Task = require("../models/task.model");
const ApiError = require("../utils/apiError");


// ======================================
// CHECK PROJECT ACCESS
// ======================================

const checkProjectAccess = async (
  req,
  res,
  next
) => {
  const {
    projectId,
  } = req.params;


  const project =
    await Project.findById(projectId);


  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }


  const userId =
    req.user._id.toString();


  const isOwner =
    project.owner.toString() === userId;


  const isMember =
    project.members?.some(
      (member) =>
        member.user.toString() === userId
    );


  if (!isOwner && !isMember) {
    throw new ApiError(
      403,
      "You don't have access to this project"
    );
  }


  req.project = project;

  next();
};



// ======================================
// CHECK TASK ACCESS
// ======================================

const checkTaskAccess = async (
  req,
  res,
  next
) => {

  const {
    taskId,
  } = req.params;


  const task =
    await Task.findById(taskId)
      .populate("project");


  if (!task) {
    throw new ApiError(
      404,
      "Task not found"
    );
  }


  const project =
    task.project;


  const userId =
    req.user._id.toString();


  const isOwner =
    project.owner.toString() === userId;


  const isMember =
    project.members?.some(
      (member) =>
        member.user.toString() === userId
    );


  if (!isOwner && !isMember) {
    throw new ApiError(
      403,
      "You don't have access to this task"
    );
  }


  req.task = task;

  next();
};


module.exports = {
  checkProjectAccess,
  checkTaskAccess,
};