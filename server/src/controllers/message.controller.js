const asyncHandler = require("../utils/asyncHandler");

const {
  sendMessageService,
  getMessagesService,
  getConversationsService,
} = require("../services/message.service");

const ApiResponse = require("../utils/apiResponse");

// =====================================
// SEND MESSAGE
// =====================================

const sendMessage = asyncHandler(async (req, res) => {
  const message = await sendMessageService({
    senderId: req.user._id,
    receiverId: req.body.receiverId,
    text: req.body.text,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      "Message sent successfully",
      message
    )
  );
});

// =====================================
// GET MESSAGES
// =====================================

const getMessages = asyncHandler(async (req, res) => {
  const messages = await getMessagesService(
    req.user._id,
    req.params.userId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Messages fetched successfully",
      messages
    )
  );
});

// =====================================
// GET CONVERSATIONS
// =====================================

const getConversations = asyncHandler(async (req, res) => {
  const conversations =
    await getConversationsService(
      req.user._id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Conversations fetched successfully",
      conversations
    )
  );
});

module.exports = {
  sendMessage,
  getMessages,
  getConversations,
};