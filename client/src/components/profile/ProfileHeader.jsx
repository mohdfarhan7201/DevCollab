import { useRef } from "react";

export default function ProfileHeader({
  profile,
  onEdit,
  onAvatarChange,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onAvatarChange(file);
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        gap: "30px",
        alignItems: "center",
        marginBottom: "25px",
        flexWrap: "wrap",
      }}
    >
      {/* ===================== */}
      {/* AVATAR */}
      {/* ===================== */}

      <div
        style={{
          textAlign: "center",
        }}
      >
        <img
          src={
            profile.avatar?.url ||
            "https://i.pravatar.cc/200"
          }
          alt={profile.name}
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #2563EB",
          }}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          style={{
            marginTop: "12px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background: "#2563EB",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Change Avatar
        </button>
      </div>

      {/* ===================== */}
      {/* USER INFO */}
      {/* ===================== */}

      <div
        style={{
          flex: 1,
        }}
      >
        <h1
          style={{
            marginBottom: "8px",
          }}
        >
          {profile.name}
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        >
          @{profile.username}
        </p>

        <div
          style={{
            display: "flex",
            gap: "30px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>
              {profile.followers?.length || 0}
            </strong>
            <br />
            Followers
          </div>

          <div>
            <strong>
              {profile.following?.length || 0}
            </strong>
            <br />
            Following
          </div>

          <div>
            <strong>
              {profile.projectsCount || 0}
            </strong>
            <br />
            Projects
          </div>
        </div>

        <button
          onClick={onEdit}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
