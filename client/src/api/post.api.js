import api from "../lib/axios";

// ======================================
// GET FEED
// ======================================

export const getFeedApi = async (
  page = 1,
  limit = 10
) => {
  const { data } = await api.get(
    `/posts?page=${page}&limit=${limit}`
  );

  return data.data;
};

// ======================================
// GET SINGLE POST
// ======================================

export const getPostApi = async (
  postId
) => {
  const { data } = await api.get(
    `/posts/${postId}`
  );

  return data.data;
};

// ======================================
// GET USER POSTS
// ======================================

export const getUserPostsApi =
  async (userId) => {
    const { data } =
      await api.get(
        `/posts/user/${userId}`
      );

    return data.data;
  };

// ======================================
// CREATE POST
// ======================================

export const createPostApi =
  async (payload) => {
    const { data } =
      await api.post(
        "/posts",
        payload
      );

    return data.data;
  };

// ======================================
// UPDATE POST
// ======================================

export const updatePostApi =
  async (
    postId,
    payload
  ) => {
    const { data } =
      await api.patch(
        `/posts/${postId}`,
        payload
      );

    return data.data;
  };

// ======================================
// DELETE POST
// ======================================

export const deletePostApi =
  async (postId) => {
    const { data } =
      await api.delete(
        `/posts/${postId}`
      );

    return data.data;
  };

// ======================================
// TOGGLE LIKE
// ======================================

export const toggleLikeApi =
  async (postId) => {
    const { data } =
      await api.patch(
        `/posts/${postId}/like`
      );

    return data.data;
  };