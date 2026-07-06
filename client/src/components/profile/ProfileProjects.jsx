import { useEffect, useState } from "react";

import { getMyProjects } from "../../api/project.api";

import ProjectCard from "../project/ProjectCard";

export default function ProfileProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD MY PROJECTS
  // =========================

  const loadProjects = async () => {
    try {
      const data = await getMyProjects();

      setProjects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // =========================
  // DELETE
  // =========================

  const handleDelete = (projectId) => {
    setProjects((prev) =>
      prev.filter((project) => project._id !== projectId)
    );
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdated = (updatedProject) => {
    setProjects((prev) =>
      prev.map((project) =>
        project._id === updatedProject._id
          ? updatedProject
          : project
      )
    );
  };

  return (
    <section
      style={{
        marginTop: "30px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "26px",
        }}
      >
        My Projects
      </h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "30px",
            textAlign: "center",
            color: "#6B7280",
          }}
        >
          No projects yet.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDelete}
              onUpdated={handleUpdated}
            />
          ))}
        </div>
      )}
    </section>
  );
}