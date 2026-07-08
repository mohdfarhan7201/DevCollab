const express = require("express");

const router = express.Router();

const {
  createTask,
  getProjectTasks,
  updateTask,
  moveTask,
  deleteTask,
} = require("../controllers/task.controller");


const authMiddleware = require("../middlewares/auth.middleware");


// ======================================
// PROJECT TASK ROUTES
// ======================================

// create task
router.post(
  "/project/:projectId",
  authMiddleware,
  createTask
);


// get project tasks
router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectTasks
);


// update task
router.patch(
  "/:taskId",
  authMiddleware,
  updateTask
);


// move task
router.patch(
  "/:taskId/move",
  authMiddleware,
  moveTask
);


// delete task
router.delete(
  "/:taskId",
  authMiddleware,
  deleteTask
);


module.exports = router;