import axios from "../lib/axios";


// Get all conversations
export const getConversationsApi = async () => {
  const response = await axios.get(
    "/messages/conversations"
  );

  return response.data;
};



// Get messages between users
export const getMessagesApi = async (conversationId) => {
  const response = await axios.get(
    `/messages/${conversationId}`
  );

  return response.data;
};



// Send message
export const sendMessageApi = async (data) => {

  const response = await axios.post(
    "/messages",
    data
  );

  return response.data;
};