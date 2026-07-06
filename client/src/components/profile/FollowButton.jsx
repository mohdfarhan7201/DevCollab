import { useState } from "react";

import { toggleFollow } from "../../api/follow.api";

export default function FollowButton({
  userId,
  initialFollowing = false,
  onChange,
}) {
  const [isFollowing, setIsFollowing] =
    useState(initialFollowing);

  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await toggleFollow(userId);

      // Backend can return different keys depending on implementation
      const following =
        result?.following ??
        result?.isFollowing ??
        !isFollowing;

      setIsFollowing(following);

      if (onChange) {
        onChange(following, result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      style={{
        padding: "10px 22px",
        borderRadius: "8px",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        background: isFollowing
          ? "#E5E7EB"
          : "#2563EB",
        color: isFollowing
          ? "#111827"
          : "#fff",
        fontWeight: 600,
        transition: ".2s",
      }}
    >
      {loading
        ? "Please wait..."
        : isFollowing
        ? "Following"
        : "Follow"}
    </button>
  );
}