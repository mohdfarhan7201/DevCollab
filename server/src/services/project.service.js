const Project = require("../models/project.model");
const ApiError = require("../utils/apiError");

const { uploadImage } = require("./cloudinary.service");

const createProjectService = async (userId, data, file) => {

    const {
        title,
        description,
        techStack,
        githubUrl,
        liveUrl,
    } = data;

    if (!title || !description) {
        throw new ApiError(400, "Title and Description are required");
    }

    let thumbnail = {
        url: "",
        public_id: "",
    };

    if (file) {

        const uploadedImage = await uploadImage(file.buffer);

        thumbnail = {
            url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
        };

    }

    const project = await Project.create({

        title,

        description,

        techStack,

        githubUrl,

        liveUrl,

        thumbnail,

        owner: userId,

    });

    return project;

};


const getAllProjectsService = async () => {

    const projects = await Project.find()
        .populate("owner", "name username avatar")
        .sort({ createdAt: -1 });

    return projects;

};


const getProjectByIdService = async (projectId) => {

    const project = await Project.findById(projectId)
        .populate("owner", "name username avatar");

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;

};


module.exports = {

    createProjectService,
    getAllProjectsService,
    getProjectByIdService,

};