import api from "../lib/axios";

// ======================================
// Current User Profile
// ======================================

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data.data;
};

// ======================================
// Public User Profile
// ======================================

export const getUserById = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data.data;
};

// ======================================
// Update Profile
// ======================================

export const updateProfile = async (data) => {
  const res = await api.patch(
    "/users/profile",
    data
  );

  return res.data.data;
};

// ======================================
// Update Avatar
// ======================================

export const updateAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await api.patch(
    "/users/avatar",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data.data;
};

// ======================================
// Search Users
// ======================================

export const searchUsers = async (query) => {
  const res = await api.get(
    `/users/search?q=${encodeURIComponent(
      query
    )}`
  );

  return res.data.data;
};

// ======================================
// Get All Users
// ======================================

export const getAllUsers = async (
  page = 1,
  limit = 10
) => {
  const res = await api.get(
    `/users?page=${page}&limit=${limit}`
  );

  return res.data.data;
};

// ======================================
// Follow / Unfollow
// ======================================

export const toggleFollow = async (
  userId
) => {
  const res = await api.patch(
    `/follow/${userId}`
  );

  return res.data.data;
};