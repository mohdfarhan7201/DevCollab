import api from "../lib/axios";

// GET USER PROFILE
export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data.data;
};

// SEARCH USERS (optional use later)
export const searchUsers = async (query) => {
  const res = await api.get(`/users/search?q=${query}`);
  return res.data.data;
};

// FOLLOW / UNFOLLOW (if you already have endpoint)
export const toggleFollow = async (userId) => {
  const res = await api.patch(`/follow/${userId}`);
  return res.data.data;
};