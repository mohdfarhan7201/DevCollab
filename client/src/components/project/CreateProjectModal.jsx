import { useState } from "react";
import { createProject } from "../../api/project.api";

export default function CreateProjectModal({
  open,
  onClose,
  onCreated,
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

  if (!open) return null;

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

    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and Description are required.");
      return;
    }

    try {
      setLoading(true);

      await createProject({
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

      setForm({
        title: "",
        description: "",
        github: "",
        liveDemo: "",
        techStack: "",
        image: null,
      });

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Create Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="github"
            placeholder="GitHub URL"
            value={form.github}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="liveDemo"
            placeholder="Live Demo URL"
            value={form.liveDemo}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="techStack"
            placeholder="React, Node, MongoDB"
            value={form.techStack}
            onChange={handleChange}
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

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
              style={styles.create}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Project"}
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
    width: "550px",
    maxWidth: "95%",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    marginBottom: "15px",
    resize: "vertical",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
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
    cursor: "pointer",
    background: "#E5E7EB",
  },

  create: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#2563EB",
    color: "#fff",
  },
};