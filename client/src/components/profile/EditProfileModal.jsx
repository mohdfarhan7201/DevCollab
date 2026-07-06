import { useEffect, useState } from "react";

export default function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: "",
  });

  useEffect(() => {
    if (!profile) return;

    setForm({
      name: profile.name || "",
      bio: profile.bio || "",
      location: profile.location || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      portfolio: profile.portfolio || "",
      skills: (profile.skills || []).join(", "),
    });
  }, [profile]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave({
      ...form,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            marginBottom: "24px",
          }}
        >
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}

          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          {/* Bio */}

          <label
            style={{
              display: "block",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                marginBottom: "6px",
                fontWeight: 600,
              }}
            >
              Bio
            </div>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              style={textareaStyle}
            />
          </label>

          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <Input
            label="GitHub"
            name="github"
            value={form.github}
            onChange={handleChange}
          />

          <Input
            label="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
          />

          <Input
            label="Portfolio"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
          />

          <Input
            label="Skills (comma separated)"
            name="skills"
            value={form.skills}
            onChange={handleChange}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "30px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={secondaryButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={primaryButton}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================= */
/* REUSABLE INPUT */
/* ========================= */

function Input({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <label
      style={{
        display: "block",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          marginBottom: "6px",
          fontWeight: 600,
        }}
      >
        {label}
      </div>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </label>
  );
}

/* ========================= */
/* STYLES */
/* ========================= */

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const primaryButton = {
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px 20px",
  cursor: "pointer",
  fontWeight: 600,
};

const secondaryButton = {
  background: "#E5E7EB",
  color: "#111827",
  border: "none",
  borderRadius: "8px",
  padding: "10px 20px",
  cursor: "pointer",
  fontWeight: 600,
};