const Task = require("../models/task.model");
const Project = require("../models/project.model");
const ApiError = require("../utils/apiError");

// ======================================
// CREATE TASK
// ======================================

const createTaskService = async (
  userId,
  projectId,
  payload
) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const {
    title,
    description = "",
    priority = "medium",
    assignee = null,
    dueDate = null,
    labels = [],
    status = "todo",
  } = payload;

  if (!title?.trim()) {
    throw new ApiError(400, "Task title is required");
  }

  const lastTask = await Task.findOne({
    project: projectId,
    status,
  }).sort({ order: -1 });

  const order = lastTask ? lastTask.order + 1 : 0;

  const task = await Task.create({
    project: projectId,
    title: title.trim(),
    description,
    priority,
    assignee,
    dueDate,
    labels,
    status,
    order,
    createdBy: userId,
  });

  return await Task.findById(task._id)
    .populate("assignee", "name username avatar")
    .populate("createdBy", "name username avatar");
};

// ======================================
// GET PROJECT TASKS
// ======================================

const getProjectTasksService = async (
  projectId
) => {
  return await Task.find({
    project: projectId,
  })
    .populate("assignee", "name username avatar")
    .populate("createdBy", "name username avatar")
    .sort({
      status: 1,
      order: 1,
      createdAt: 1,
    });
};

// ======================================
// UPDATE TASK
// ======================================

const updateTaskService = async (
  taskId,
  payload
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  Object.keys(payload).forEach((key) => {
    task[key] = payload[key];
  });

  await task.save();

  return await Task.findById(task._id)
    .populate("assignee", "name username avatar")
    .populate("createdBy", "name username avatar");
};

// ======================================
// MOVE TASK
// ======================================

const moveTaskService = async (
  taskId,
  status,
  order
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  task.status = status;
  task.order = order;

  await task.save();

  return task;
};

// ======================================
// DELETE TASK
// ======================================

const deleteTaskService = async (
  taskId
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await task.deleteOne();

  return true;
};

module.exports = {
  createTaskService,
  getProjectTasksService,
  updateTaskService,
  moveTaskService,
  deleteTaskService,
};