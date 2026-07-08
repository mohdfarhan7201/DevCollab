const registerTaskSocket = (io, socket) => {

  // ======================================
  // JOIN PROJECT ROOM
  // ======================================

  socket.on(
    "join-project",
    (projectId) => {

      socket.join(
        `project:${projectId}`
      );

    }
  );


  // ======================================
  // LEAVE PROJECT ROOM
  // ======================================

  socket.on(
    "leave-project",
    (projectId) => {

      socket.leave(
        `project:${projectId}`
      );

    }
  );

};


// ======================================
// TASK EVENTS
// ======================================

const emitTaskCreated = (
  io,
  projectId,
  task
) => {

  io.to(
    `project:${projectId}`
  )
  .emit(
    "task-created",
    task
  );

};



const emitTaskUpdated = (
  io,
  projectId,
  task
) => {

  io.to(
    `project:${projectId}`
  )
  .emit(
    "task-updated",
    task
  );

};



const emitTaskDeleted = (
  io,
  projectId,
  taskId
) => {

  io.to(
    `project:${projectId}`
  )
  .emit(
    "task-deleted",
    taskId
  );

};



module.exports = {
  registerTaskSocket,
  emitTaskCreated,
  emitTaskUpdated,
  emitTaskDeleted,
};