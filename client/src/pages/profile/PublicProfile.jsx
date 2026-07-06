import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getUserById,
} from "../../api/user.api";

import {
  getProjects,
} from "../../api/project.api";

import {
  getFeed,
} from "../../api/post.api";

import PublicProfileHeader from "../../components/profile/PublicProfileHeader";
import ProjectCard from "../../components/project/ProjectCard";

export default function PublicProfile() {
  const { userId } = useParams();

  const [profile, setProfile] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadProfile =
    async () => {
      try {
        setLoading(true);

        const user =
          await getUserById(
            userId
          );

        setProfile(user);

        // Load Projects

        const projectData =
          await getProjects({
            user: userId,
          });

        setProjects(
          projectData.projects ||
            projectData
        );

        // Load Posts

        const feed =
          await getFeed();

        const userPosts =
          feed.filter(
            (post) =>
              post.author?._id ===
              userId
          );

        setPosts(userPosts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  if (loading) {
    return (
      <div
        style={{
          padding: 50,
          textAlign: "center",
        }}
      >
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          padding: 50,
          textAlign: "center",
        }}
      >
        User not found.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <PublicProfileHeader
        profile={profile}
      />

            {/* ========================= */}
      {/* PROJECTS */}
      {/* ========================= */}

      <section
        style={{
          marginTop: "40px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Projects
        </h2>

        {projects.length === 0 ? (
          <div
            style={{
              padding: "30px",
              background: "#fff",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid #E5E7EB",
            }}
          >
            No projects found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(340px,1fr))",
              gap: "20px",
            }}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={() => {}}
                onUpdated={() => {}}
              />
            ))}
          </div>
        )}
      </section>

      {/* ========================= */}
      {/* POSTS */}
      {/* ========================= */}

      <section
        style={{
          marginTop: "50px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Recent Posts
        </h2>

        {posts.length === 0 ? (
          <div
            style={{
              padding: "30px",
              background: "#fff",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid #E5E7EB",
            }}
          >
            No posts yet.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {posts.map((post) => (
              <div
                key={post._id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.7,
                  }}
                >
                  {post.content}
                </div>

                {post.image?.url && (
                  <img
                    src={post.image.url}
                    alt=""
                    style={{
                      width: "100%",
                      marginTop: "15px",
                      borderRadius: "10px",
                    }}
                  />
                )}

                <div
                  style={{
                    marginTop: "15px",
                    color: "#6B7280",
                    fontSize: "14px",
                  }}
                >
                  ❤️ {post.likes?.length || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}