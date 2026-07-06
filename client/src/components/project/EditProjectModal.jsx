import { useEffect, useState } from "react";
import { updateProject } from "../../api/project.api";

export default function EditProjectModal({
  open,
  onClose,
  project,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    liveDemo: "",
    techStack: "",
    image: null,
  });

  useEffect(() => {
    if (!project) return;

    setForm({
      title: project.title || "",
      description: project.description || "",
      github: project.github || "",
      liveDemo: project.liveDemo || "",
      techStack: (project.techStack || []).join(", "),
      image: null,
    });
  }, [project]);

  if (!open || !project) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm((prev) => ({
        ...prev,
        image: files[0],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return alert("Project title is required.");
    }

    try {
      setLoading(true);

      await updateProject(project._id, {
        title: form.title,
        description: form.description,
        github: form.github,
        liveDemo: form.liveDemo,
        techStack: form.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        image: form.image,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            style={styles.input}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description"
            style={styles.textarea}
          />

          <input
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            style={styles.input}
          />

          <input
            name="liveDemo"
            value={form.liveDemo}
            onChange={handleChange}
            placeholder="Live Demo URL"
            style={styles.input}
          />

          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Node, MongoDB"
            style={styles.input}
          />

          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
          />

          {project.image?.url && (
            <img
              src={project.image.url}
              alt="project"
              style={styles.preview}
            />
          )}

          <div style={styles.actions}>
            <button
              type="button"
              style={styles.cancel}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.save}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    width: "560px",
    maxWidth: "95%",
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    marginBottom: "15px",
    resize: "vertical",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
  },

  preview: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    marginTop: "15px",
    borderRadius: "10px",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },

  cancel: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#E5E7EB",
    cursor: "pointer",
  },

  save: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#2563EB",
    color: "#fff",
    cursor: "pointer",
  },
};