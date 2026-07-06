import { useEffect, useState } from "react";
import { getFeed, likePost, createPost } from "../../api/post.api";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  // =========================
  // LOAD FEED
  // =========================
  const loadFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();

      // backend response safety
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Feed error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  // =========================
  // CREATE POST
  // =========================
  const handleCreatePost = async () => {
    if (!content.trim()) return;

    try {
      setCreating(true);

      const newPost = await createPost({ content });

      // safe insert
      setPosts((prev) => [newPost, ...prev]);

      setContent("");
    } catch (err) {
      console.log("Create post error:", err);
    } finally {
      setCreating(false);
    }
  };

  // =========================
  // LIKE POST (optimistic update)
  // =========================
  const handleLike = async (id) => {
    try {
      const updated = await likePost(id);

      setPosts((prev) =>
        prev.map((p) =>
          p._id === id
            ? {
                ...p,
                likes: Array(updated.likesCount)
                  .fill(0)
                  .map((_, i) => i),
              }
            : p
        )
      );
    } catch (err) {
      console.log("Like error:", err);
    }
  };

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div style={styles.center}>
        Loading feed...
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* =========================
          CREATE POST BOX
      ========================= */}
      <div style={styles.createBox}>
        <textarea
          style={styles.textarea}
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          style={styles.postBtn}
          onClick={handleCreatePost}
          disabled={creating}
        >
          {creating ? "Posting..." : "Post"}
        </button>
      </div>

      {/* =========================
          FEED LIST
      ========================= */}
      {posts.length === 0 ? (
        <div style={styles.empty}>
          No posts yet
        </div>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.card}>

            {/* HEADER */}
            <div style={styles.header}>
              <img
                src={
                  post.author?.avatar?.url ||
                  "https://i.pravatar.cc/40"
                }
                alt="avatar"
                style={styles.avatar}
              />

              <div>
                <div style={styles.username}>
                  {post.author?.name}
                </div>

                <div style={styles.time}>
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div style={styles.content}>
              {post.content}
            </div>

            {/* ACTIONS */}
            <div style={styles.actions}>
              <button
                style={styles.likeBtn}
                onClick={() => handleLike(post._id)}
              >
                ❤️ {post.likes?.length || 0}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// =========================
// STYLES
// =========================
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  empty: {
    textAlign: "center",
    color: "gray",
    marginTop: "20px",
  },

  createBox: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "20px",
  },

  textarea: {
    width: "100%",
    minHeight: "80px",
    border: "none",
    outline: "none",
    resize: "none",
  },

  postBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "15px",
    background: "#fff",
  },

  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },

  username: {
    fontWeight: "bold",
  },

  time: {
    fontSize: "12px",
    color: "gray",
  },

  content: {
    marginBottom: "10px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  likeBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
  },
};