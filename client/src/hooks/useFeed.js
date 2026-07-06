import { useEffect, useState } from "react";
import { getFeed } from "../api/posts";

export const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setPosts(data);
    } catch (error) {
      console.log("Feed error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return {
    posts,
    loading,
    refetch: fetchFeed,
  };
};