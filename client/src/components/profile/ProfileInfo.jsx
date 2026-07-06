export default function ProfileInfo({ profile }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      {/* ========================= */}
      {/* BIO */}
      {/* ========================= */}

      <section
        style={{
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            marginBottom: "12px",
            fontSize: "22px",
          }}
        >
          About
        </h2>

        <p
          style={{
            color: "#4B5563",
            lineHeight: "1.7",
          }}
        >
          {profile.bio?.trim()
            ? profile.bio
            : "No bio added yet."}
        </p>
      </section>

      {/* ========================= */}
      {/* SKILLS */}
      {/* ========================= */}

      <section
        style={{
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            marginBottom: "12px",
            fontSize: "22px",
          }}
        >
          Skills
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {profile.skills?.length ? (
            profile.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: "#EEF2FF",
                  color: "#4338CA",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {skill}
              </span>
            ))
          ) : (
            <span
              style={{
                color: "#6B7280",
              }}
            >
              No skills added.
            </span>
          )}
        </div>
      </section>

      {/* ========================= */}
      {/* CONTACT & LINKS */}
      {/* ========================= */}

      <section>
        <h2
          style={{
            marginBottom: "12px",
            fontSize: "22px",
          }}
        >
          Contact & Links
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Location */}

          <InfoItem
            label="Location"
            value={profile.location}
          />

          {/* GitHub */}

          <InfoLink
            label="GitHub"
            value={profile.github}
          />

          {/* LinkedIn */}

          <InfoLink
            label="LinkedIn"
            value={profile.linkedin}
          />

          {/* Portfolio */}

          <InfoLink
            label="Portfolio"
            value={profile.portfolio}
          />
        </div>
      </section>
    </div>
  );
}

/* ========================= */
/* SMALL COMPONENTS */
/* ========================= */

function InfoItem({
  label,
  value,
}) {
  return (
    <div>
      <strong>{label}</strong>

      <div
        style={{
          marginTop: "6px",
          color: "#4B5563",
        }}
      >
        {value?.trim()
          ? value
          : "Not provided"}
      </div>
    </div>
  );
}

function InfoLink({
  label,
  value,
}) {
  return (
    <div>
      <strong>{label}</strong>

      <div
        style={{
          marginTop: "6px",
        }}
      >
        {value?.trim() ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#2563EB",
              textDecoration: "none",
              wordBreak: "break-word",
            }}
          >
            {value}
          </a>
        ) : (
          <span
            style={{
              color: "#6B7280",
            }}
          >
            Not provided
          </span>
        )}
      </div>
    </div>
  );
}