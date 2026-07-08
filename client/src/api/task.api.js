import api from "../lib/axios";

// ======================================
// GET PROJECT TASKS
// ======================================
export const getProjectTasksApi = async (projectId) => {
    const { data } = await api.get(`/tasks/project/${projectId}`);
    return data.data;
};

// ======================================
// CREATE TASK
// ======================================
export const createTaskApi = async (projectId, taskData) => {
    const { data } = await api.post(`/tasks/project/${projectId}`, taskData);
    return data.data;
};

// ======================================
// UPDATE TASK
// ======================================
export const updateTaskApi = async (taskId, taskData) => {
    const { data } = await api.patch(`/tasks/${taskId}`, taskData);
    return data.data;
};

// ======================================
// MOVE TASK
// ======================================
export const moveTaskApi = async (taskId, status, order) => {
    const { data } = await api.patch(`/tasks/${taskId}/move`, { status, order });
    return data.data;
};

// ======================================
// DELETE TASK
// ======================================
export const deleteTaskApi = async (taskId) => {
    const { data } = await api.delete(`/tasks/${taskId}`);
    return data.data;
};
