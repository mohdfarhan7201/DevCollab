import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById } from "../../api/project.api";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);

      const data = await getProjectById(projectId);

      setProject(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div style={styles.center}>
        Project not found.
      </div>
    );
  }

  return (
    <div style={styles.container}>

      <Link to="/dashboard/projects">
        ← Back
      </Link>

      {project.image?.url && (
        <img
          src={project.image.url}
          alt={project.title}
          style={styles.image}
        />
      )}

      <h1>{project.title}</h1>

      <p style={styles.description}>
        {project.description}
      </p>

      <div style={styles.author}>
        <strong>Author:</strong>{" "}
        {project.owner?.name}
      </div>

      <div style={styles.section}>
        <h3>Tech Stack</h3>

        <div style={styles.techContainer}>
          {project.techStack?.map((tech) => (
            <span key={tech} style={styles.tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.links}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        )}

        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>
        )}
      </div>

      <div style={styles.footer}>
        Created :
        {" "}
        {new Date(
          project.createdAt
        ).toLocaleDateString()}
      </div>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
  },

  center: {
    padding: "80px",
    textAlign: "center",
  },

  image: {
    width: "100%",
    maxHeight: "450px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "25px",
  },

  description: {
    lineHeight: 1.8,
    margin: "20px 0",
  },

  author: {
    marginBottom: "20px",
  },

  section: {
    marginTop: "25px",
  },

  techContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "12px",
  },

  tech: {
    padding: "8px 14px",
    background: "#2563EB",
    color: "#fff",
    borderRadius: "999px",
    fontSize: "14px",
  },

  links: {
    marginTop: "30px",
    display: "flex",
    gap: "20px",
  },

  footer: {
    marginTop: "35px",
    color: "#777",
  },
};