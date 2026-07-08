const asyncHandler = require("../utils/asyncHandler");
const {
  createTaskService,
  getProjectTasksService,
  updateTaskService,
  moveTaskService,
  deleteTaskService,
} = require("../services/task.service");


// ======================================
// CREATE TASK
// ======================================

const createTask = asyncHandler(
  async (req, res) => {
    const {
      projectId,
    } = req.params;

    const task =
      await createTaskService(
        req.user._id,
        projectId,
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  }
);


// ======================================
// GET PROJECT TASKS
// ======================================

const getProjectTasks =
  asyncHandler(
    async (req, res) => {
      const {
        projectId,
      } = req.params;

      const tasks =
        await getProjectTasksService(
          projectId
        );

      return res.status(200).json({
        success: true,
        data: tasks,
      });
    }
  );


// ======================================
// UPDATE TASK
// ======================================

const updateTask =
  asyncHandler(
    async (req, res) => {
      const {
        taskId,
      } = req.params;

      const task =
        await updateTaskService(
          taskId,
          req.body
        );


      return res.status(200).json({
        success: true,
        message:
          "Task updated successfully",
        data: task,
      });
    }
  );


// ======================================
// MOVE TASK (KANBAN)
// ======================================

const moveTask =
  asyncHandler(
    async (req, res) => {

      const {
        taskId,
      } = req.params;


      const {
        status,
        order,
      } = req.body;


      const task =
        await moveTaskService(
          taskId,
          status,
          order
        );


      return res.status(200).json({
        success:true,
        message:
          "Task moved successfully",
        data: task,
      });
    }
  );


// ======================================
// DELETE TASK
// ======================================

const deleteTask =
  asyncHandler(
    async (req, res) => {

      const {
        taskId,
      } = req.params;


      await deleteTaskService(
        taskId
      );


      return res.status(200).json({
        success:true,
        message:
          "Task deleted successfully",
      });
    }
  );


module.exports = {
  createTask,
  getProjectTasks,
  updateTask,
  moveTask,
  deleteTask,
};