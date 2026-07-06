import { useEffect, useState } from "react";

import {
  getProjects,
  deleteProject,
} from "../../api/project.api";

import ProjectCard from "../../components/project/ProjectCard";
import CreateProjectModal from "../../components/project/CreateProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(projectId);

      setProjects((prev) =>
        prev.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2>Projects</h2>

        <button
          onClick={() => setOpenModal(true)}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#111827",
            color: "#fff",
          }}
        >
          + New Project
        </button>
      </div>

      {/* Loading */}

      {loading && (
        <p>Loading projects...</p>
      )}

      {/* Empty */}

      {!loading &&
        projects.length === 0 && (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
              border: "1px dashed #ccc",
              borderRadius: "10px",
            }}
          >
            <h3>No Projects Found</h3>

            <p>Create your first project.</p>
          </div>
        )}

      {/* Grid */}

      {!loading &&
        projects.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(320px,1fr))",
              gap: "20px",
            }}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDelete}
                onUpdated={loadProjects}
              />
            ))}
          </div>
        )}

      {/* Create Modal */}

      <CreateProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={loadProjects}
      />
    </div>
  );
}