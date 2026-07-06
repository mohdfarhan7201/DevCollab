import { useEffect, useState } from "react";
import { getProfile } from "../../api/user.api";
import { getFeed } from "../../api/post.api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD PROFILE + POSTS
  const loadProfile = async () => {
    try {
      setLoading(true);

      const userData = await getProfile();
      setUser(userData);

      const allPosts = await getFeed();

      // filter only user posts
      const myPosts = allPosts.filter(
        (p) => p.author?._id === userData._id
      );

      setPosts(myPosts);
    } catch (err) {
      console.log("Profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <div style={styles.center}>Loading profile...</div>;
  }

  if (!user) {
    return <div style={styles.center}>User not found</div>;
  }

  return (
    <div style={styles.container}>

      {/* PROFILE HEADER */}
      <div style={styles.headerBox}>
        <img
          src={user.avatar?.url || "https://i.pravatar.cc/100"}
          style={styles.avatar}
        />

        <div>
          <h2>{user.name}</h2>
          <p>@{user.username}</p>

          <p style={styles.bio}>{user.bio}</p>

          <div style={styles.stats}>
            <span>Followers: {user.followers?.length || 0}</span>
            <span>Following: {user.following?.length || 0}</span>
          </div>

          <button style={styles.followBtn}>
            Follow / Unfollow
          </button>
        </div>
      </div>

      {/* POSTS */}
      <h3 style={{ marginTop: 20 }}>Posts</h3>

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.postCard}>
            <p>{post.content}</p>

            {post.image?.url && (
              <img
                src={post.image.url}
                style={styles.postImage}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}



const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  headerBox: {
    display: "flex",
    gap: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "20px",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },

  bio: {
    color: "gray",
  },

  stats: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },

  followBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  postCard: {
    border: "1px solid #eee",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
  },

  postImage: {
    width: "100%",
    marginTop: "10px",
    borderRadius: "8px",
  },
};