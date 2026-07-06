import api from "../lib/axios";

// ======================================
// TOGGLE FOLLOW
// ======================================

export const toggleFollow = async (userId) => {
  const { data } = await api.patch(`/follow/${userId}`);

  return data.data;
};

// ======================================
// GET FOLLOWERS
// ======================================

export const getFollowers = async (userId) => {
  const { data } = await api.get(
    `/follow/followers/${userId}`
  );

  return data.data;
};

// ======================================
// GET FOLLOWING
// ======================================

export const getFollowing = async (userId) => {
  const { data } = await api.get(
    `/follow/following/${userId}`
  );

  return data.data;
};