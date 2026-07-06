import { useState } from "react";
import { Link } from "react-router-dom";

import EditProjectModal from "./EditProjectModal";

export default function ProjectCard({
  project,
  onDelete,
  onUpdated,
}) {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,.05)",
          transition: "0.25s",
        }}
      >
        {/* ========================= */}
        {/* IMAGE */}
        {/* ========================= */}

        <Link to={`/projects/${project._id}`}>
          <img
            src={
              project.image?.url ||
              "https://placehold.co/600x350?text=Project"
            }
            alt={project.title}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              display: "block",
              cursor: "pointer",
            }}
          />
        </Link>

        {/* ========================= */}
        {/* BODY */}
        {/* ========================= */}

        <div
          style={{
            padding: "18px",
          }}
        >
          <Link
            to={`/projects/${project._id}`}
            style={{
              textDecoration: "none",
              color: "#111827",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              {project.title}
            </h3>
          </Link>

          <p
            style={{
              color: "#6B7280",
              lineHeight: 1.6,
              marginBottom: "16px",
            }}
          >
            {project.description}
          </p>

          {/* ========================= */}
          {/* OWNER */}
          {/* ========================= */}

          {project.owner && (
            <p
              style={{
                marginBottom: "15px",
                fontSize: "14px",
                color: "#4B5563",
              }}
            >
              By <strong>{project.owner.name}</strong>
            </p>
          )}

          {/* ========================= */}
          {/* TECH STACK */}
          {/* ========================= */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "18px",
            }}
          >
            {(project.techStack || []).map((tech) => (
              <span
                key={tech}
                style={{
                  background: "#EEF2FF",
                  color: "#4338CA",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* ========================= */}
          {/* LINKS */}
          {/* ========================= */}

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#2563EB",
                  fontWeight: 600,
                }}
              >
                GitHub
              </a>
            )}

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#16A34A",
                  fontWeight: 600,
                }}
              >
                Live Demo
              </a>
            )}
          </div>

          {/* ========================= */}
          {/* ACTIONS */}
          {/* ========================= */}

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={() => setOpenEdit(true)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                background: "#2563EB",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(project._id)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                background: "#DC2626",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* EDIT MODAL */}
      {/* ========================= */}

      <EditProjectModal
        open={openEdit}
        project={project}
        onClose={() => setOpenEdit(false)}
        onUpdated={onUpdated}
      />
    </>
  );
}