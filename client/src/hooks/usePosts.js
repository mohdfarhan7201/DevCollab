import { useEffect, useState } from "react";

import {
  getFeedApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
  toggleLikeApi,
} from "../api/post.api";

const usePosts = () => {
  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  // =====================================
  // FETCH FEED
  // =====================================

  const fetchPosts = async (
    currentPage = 1
  ) => {
    try {
      setLoading(true);

      const data =
        await getFeedApi(
          currentPage,
          10
        );

      if (currentPage === 1) {
        setPosts(data || []);
      } else {
        setPosts((prev) => [
          ...prev,
          ...(data || []),
        ]);
      }
    } catch (error) {
      console.log(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // CREATE POST
  // =====================================

  const createPost = async (
    payload
  ) => {
    try {
      const post =
        await createPostApi(
          payload
        );

      setPosts((prev) => [
        post,
        ...prev,
      ]);

      return post;
    } catch (error) {
      console.log(
        error.message
      );

      throw error;
    }
  };

  // =====================================
  // UPDATE POST
  // =====================================

  const updatePost = async (
    postId,
    payload
  ) => {
    try {
      const updated =
        await updatePostApi(
          postId,
          payload
        );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? updated
            : post
        )
      );

      return updated;
    } catch (error) {
      console.log(
        error.message
      );

      throw error;
    }
  };

  // =====================================
  // DELETE POST
  // =====================================

  const deletePost = async (
    postId
  ) => {
    try {
      await deletePostApi(
        postId
      );

      setPosts((prev) =>
        prev.filter(
          (post) =>
            post._id !== postId
        )
      );
    } catch (error) {
      console.log(
        error.message
      );

      throw error;
    }
  };

  // =====================================
  // TOGGLE LIKE
  // =====================================

  const toggleLike = async (
    postId
  ) => {
    try {
      const result =
        await toggleLikeApi(
          postId
        );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likesCount:
                  result.likesCount,
                isLiked:
                  result.liked,
              }
            : post
        )
      );
    } catch (error) {
      console.log(
        error.message
      );
    }
  };

  // =====================================
  // LOAD MORE
  // =====================================

  const loadMore = () => {
    const nextPage =
      page + 1;

    setPage(nextPage);

    fetchPosts(nextPage);
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    fetchPosts(1);
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    fetchPosts,
    loadMore,
  };
};

export default usePosts;