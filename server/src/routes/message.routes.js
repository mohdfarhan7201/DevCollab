const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
  sendMessage,
  getMessages,
  getConversations,
} = require("../controllers/message.controller");


// Protected routes
router.use(verifyJWT);


// Get conversations
router.get(
  "/conversations",
  getConversations
);


// Get messages with user
router.get(
  "/:userId",
  getMessages
);


// Send message
router.post(
  "/",
  sendMessage
);


module.exports = router;