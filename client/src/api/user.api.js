import api from "../lib/axios";

// ======================================
// CURRENT USER PROFILE
// ======================================

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data.data;
};

// ======================================
// GET USER BY ID
// ======================================

export const getUserById = async (userId) => {
  const { data } = await api.get(`/users/${userId}`);
  return data.data;
};

// ======================================
// SEARCH USERS
// ======================================

export const searchUsers = async (query = "") => {
  const { data } = await api.get("/users/search", {
    params: {
      q: query,
    },
  });

  return data.data;
};

// ======================================
// GET ALL USERS
// ======================================

export const getAllUsers = async (page = 1, limit = 20) => {
  const { data } = await api.get("/users", {
    params: {
      page,
      limit,
    },
  });

  return data.data;
};

// ======================================
// FOLLOW / UNFOLLOW
// ======================================

export const toggleFollow = async (userId) => {
  const { data } = await api.patch(`/follow/${userId}`);
  return data.data;
};