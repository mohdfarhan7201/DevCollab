import api from "../lib/axios";

// ======================================
// GET ALL PROJECTS
// ======================================

export const getProjects = async (params = {}) => {
  const { data } = await api.get("/projects", {
    params,
  });

  return data.data;
};

// ======================================
// GET SINGLE PROJECT
// ======================================

export const getProjectById = async (projectId) => {
  const { data } = await api.get(
    `/projects/${projectId}`
  );

  return data.data;
};

// ======================================
// CREATE PROJECT
// ======================================

export const createProject = async (projectData) => {
  const formData = new FormData();

  formData.append("title", projectData.title);
  formData.append(
    "description",
    projectData.description
  );

  if (projectData.github) {
    formData.append("github", projectData.github);
  }

  if (projectData.liveDemo) {
    formData.append(
      "liveDemo",
      projectData.liveDemo
    );
  }

  if (
    projectData.techStack &&
    Array.isArray(projectData.techStack)
  ) {
    formData.append(
      "techStack",
      JSON.stringify(projectData.techStack)
    );
  }

  if (projectData.image instanceof File) {
    formData.append(
      "image",
      projectData.image
    );
  }

  const { data } = await api.post(
    "/projects",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data.data;
};

// ======================================
// UPDATE PROJECT
// ======================================

export const updateProject = async (
  projectId,
  projectData
) => {
  const formData = new FormData();

  if (projectData.title !== undefined) {
    formData.append(
      "title",
      projectData.title
    );
  }

  if (
    projectData.description !== undefined
  ) {
    formData.append(
      "description",
      projectData.description
    );
  }

  if (projectData.github !== undefined) {
    formData.append(
      "github",
      projectData.github
    );
  }

  if (
    projectData.liveDemo !== undefined
  ) {
    formData.append(
      "liveDemo",
      projectData.liveDemo
    );
  }

  if (
    projectData.techStack &&
    Array.isArray(projectData.techStack)
  ) {
    formData.append(
      "techStack",
      JSON.stringify(projectData.techStack)
    );
  }

  if (projectData.image instanceof File) {
    formData.append(
      "image",
      projectData.image
    );
  }

  const { data } = await api.patch(
    `/projects/${projectId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data.data;
};

// ======================================
// DELETE PROJECT
// ======================================

export const deleteProject = async (
  projectId
) => {
  const { data } = await api.delete(
    `/projects/${projectId}`
  );

  return data.data;
};

// ======================================
// GET MY PROJECTS
// ======================================

export const getMyProjects = async () => {
  const { data } = await api.get(
    "/projects/me"
  );

  return data.data;
};