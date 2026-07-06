import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllUsers,
  searchUsers,
} from "../api/user.api";

import FollowButton from "../components/profile/FollowButton";

export default function Search() {
  const [users, setUsers] = useState([]);

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const result =
        await getAllUsers();

      setUsers(
        result.users || result
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch =
    async (value) => {
      setQuery(value);

      try {
        if (!value.trim()) {
          loadUsers();
          return;
        }

        const result =
          await searchUsers(
            value
          );

        setUsers(result);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        Find Developers
      </h1>

      <input
        type="text"
        placeholder="Search by name, username..."
        value={query}
        onChange={(e) =>
          handleSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "10px",
          border:
            "1px solid #D1D5DB",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      />

      {loading ? (
        <div>
          Loading...
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
          {users.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "50px",
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
              }}
            >
              No developers found.
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                style={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Avatar + Name */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <img
                    src={
                      user.avatar?.url ||
                      "https://i.pravatar.cc/150"
                    }
                    alt={user.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <h3
                      style={{
                        margin: 0,
                      }}
                    >
                      {user.name}
                    </h3>

                    <p
                      style={{
                        marginTop: "4px",
                        color: "#6B7280",
                      }}
                    >
                      @{user.username}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                {user.bio && (
                  <p
                    style={{
                      color: "#4B5563",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {user.bio}
                  </p>
                )}

                {/* Skills */}
                {user.skills?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          background: "#EEF2FF",
                          color: "#4338CA",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "auto",
                  }}
                >
                  <Link
                    to={`/profile/${user._id}`}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      textDecoration: "none",
                      background: "#2563EB",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      fontWeight: 600,
                    }}
                  >
                    View Profile
                  </Link>

                  <FollowButton
                    userId={user._id}
                    initialFollowing={
                      user.isFollowing || false
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}