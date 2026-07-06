import FollowButton from "./FollowButton";

export default function PublicProfileHeader({
  profile,
  isOwnProfile = false,
  onFollowChange,
}) {
  if (!profile) return null;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        marginBottom: "30px",
      }}
    >
      {/* Cover */}
      <div
        style={{
          height: "180px",
          background:
            "linear-gradient(135deg,#2563EB,#7C3AED)",
        }}
      />

      <div
        style={{
          padding: "0 30px 30px",
        }}
      >
        {/* Avatar */}
        <img
          src={
            profile.avatar?.url ||
            "https://i.pravatar.cc/200"
          }
          alt={profile.name}
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            objectFit: "cover",
            marginTop: "-65px",
            border: "6px solid white",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "20px",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Left */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
              }}
            >
              {profile.name}
            </h1>

            <p
              style={{
                color: "#6B7280",
                marginTop: "6px",
              }}
            >
              @{profile.username}
            </p>

            {profile.bio && (
              <p
                style={{
                  marginTop: "18px",
                  lineHeight: 1.7,
                }}
              >
                {profile.bio}
              </p>
            )}

            {/* Skills */}

            {profile.skills?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "18px",
                }}
              >
                {profile.skills.map((skill) => (
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

            {/* Links */}

            <div
              style={{
                marginTop: "22px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                color: "#4B5563",
              }}
            >
              {profile.location && (
                <span>📍 {profile.location}</span>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

              {profile.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>

          {/* Right */}

          {!isOwnProfile && (
            <FollowButton
              userId={profile._id}
              initialFollowing={
                profile.isFollowing || false
              }
              onChange={onFollowChange}
            />
          )}
        </div>

        {/* Stats */}

        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "35px",
            borderTop: "1px solid #eee",
            paddingTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <Stat
            title="Followers"
            value={profile.followers?.length || 0}
          />

          <Stat
            title="Following"
            value={profile.following?.length || 0}
          />

          <Stat
            title="Projects"
            value={profile.projectsCount || 0}
          />

          <Stat
            title="Posts"
            value={profile.postsCount || 0}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
}) {
  return (
    <div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#6B7280",
        }}
      >
        {title}
      </div>
    </div>
  );
}