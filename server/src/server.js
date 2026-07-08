require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const {
  initSocket,
} = require("./socket");

const PORT =
  process.env.PORT || 8000;

// ======================================
// START SERVER
// ======================================

const startServer = async () => {
  try {

    // Connect Database

    await connectDB();

    // Create HTTP Server

    const server =
      http.createServer(app);

    // Initialize Socket.IO

    initSocket(server);

    // Start Server

    server.listen(
      PORT,
      () => {

        console.log(
          `🚀 Server running on port ${PORT}`
        );

      }
    );

  } catch(error){


    console.log(
      "Server Startup Error:",
      error.message
    );

    process.exit(1);
  }
};

startServer();