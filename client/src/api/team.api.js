import api from "../lib/axios";

// ======================================
// GET MY TEAMS
// ======================================
export const getMyTeamsApi = async () => {
    const { data } = await api.get("/teams/my-teams");
    return data.data;
};

// ======================================
// GET ALL TEAMS
// ======================================
export const getAllTeamsApi = async (page = 1, limit = 10) => {
    const { data } = await api.get("/teams", {
        params: { page, limit },
    });
    return data.data;
};

// ======================================
// GET TEAM BY ID
// ======================================
export const getTeamByIdApi = async (teamId) => {
    const { data } = await api.get(`/teams/${teamId}`);
    return data.data;
};

// ======================================
// CREATE TEAM
// ======================================
export const createTeamApi = async (teamData) => {
    const formData = new FormData();
    formData.append("name", teamData.name);
    formData.append("description", teamData.description || "");
    if (teamData.avatar instanceof File) {
        formData.append("avatar", teamData.avatar);
    }

    const { data } = await api.post("/teams", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data.data;
};

// ======================================
// UPDATE TEAM
// ======================================
export const updateTeamApi = async (teamId, teamData) => {
    const formData = new FormData();
    if (teamData.name !== undefined) formData.append("name", teamData.name);
    if (teamData.description !== undefined) {
        formData.append("description", teamData.description);
    }
    if (teamData.avatar instanceof File) {
        formData.append("avatar", teamData.avatar);
    }

    const { data } = await api.patch(`/teams/${teamId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data.data;
};

// ======================================
// DELETE TEAM
// ======================================
export const deleteTeamApi = async (teamId) => {
    const { data } = await api.delete(`/teams/${teamId}`);
    return data.data;
};

// ======================================
// INVITE MEMBER
// ======================================
export const inviteMemberApi = async (teamId, userId) => {
    const { data } = await api.patch(`/teams/${teamId}/invite`, { userId });
    return data.data;
};

// ======================================
// REMOVE MEMBER
// ======================================
export const removeMemberApi = async (teamId, userId) => {
    const { data } = await api.patch(`/teams/${teamId}/remove-member`, { userId });
    return data.data;
};

// ======================================
// LEAVE TEAM
// ======================================
export const leaveTeamApi = async (teamId) => {
    const { data } = await api.patch(`/teams/${teamId}/leave`);
    return data.data;
};

// ======================================
// SEARCH TEAMS
// ======================================
export const searchTeamsApi = async (query) => {
    const { data } = await api.get("/teams/search", {
        params: { q: query },
    });
    return data.data;
};
