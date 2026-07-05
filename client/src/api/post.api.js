import api from "../lib/axios";

// GET FEED
export const getFeed = async () => {
  const res = await api.get("/posts/feed");
  return res.data.data;
};

// CREATE POST
export const createPost = async (data) => {
  const res = await api.post("/posts", data);
  return res.data.data;
};

// LIKE POST
export const likePost = async (postId) => {
  const res = await api.patch(`/posts/${postId}/like`);
  return res.data.data;
};