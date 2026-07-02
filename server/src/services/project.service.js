const Project = require("../models/project.model");
const ApiError = require("../utils/apiError");

const {
    uploadImage,
    deleteImage,
} = require("./cloudinary.service");

// ======================================================
// Create Project
// ======================================================

const createProjectService = async (userId, data, file) => {

    let {
        title,
        description,
        techStack,
        githubUrl,
        liveUrl,
    } = data;

    if (!title || !description) {
        throw new ApiError(400, "Title and Description are required");
    }

    // Convert comma separated string into array
    if (techStack) {
        techStack = Array.isArray(techStack)
            ? techStack
            : techStack
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
    } else {
        techStack = [];
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

// ======================================================
// Get All Projects
// ======================================================

const getAllProjectsService = async (
    query = "",
    page = 1,
    limit = 10
) => {

    page = Math.max(1, Number(page) || 1);
    limit = Math.min(20, Number(limit) || 10);

    const skip = (page - 1) * limit;

    const filter = {};

    if (query) {

        filter.$or = [

            {
                title: {
                    $regex: query,
                    $options: "i",
                },
            },

            {
                description: {
                    $regex: query,
                    $options: "i",
                },
            },

        ];

    }

    const projects = await Project.find(filter)

        .populate(
            "owner",
            "name username avatar"
        )

        .sort({
            createdAt: -1,
        })

        .skip(skip)

        .limit(limit);

    const totalProjects =
        await Project.countDocuments(filter);

    return {

        projects,

        page,

        limit,

        totalProjects,

        totalPages: Math.ceil(
            totalProjects / limit
        ),

    };

};

// ======================================================
// Get Project By ID
// ======================================================

const getProjectByIdService = async (projectId) => {

    const project = await Project.findById(projectId)
        .populate("owner", "name username avatar");

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;

};

// ======================================================
// Update Project
// ======================================================

const updateProjectService = async (
    projectId,
    userId,
    data,
    file
) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Authorization
    if (project.owner.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to update this project"
        );
    }

    const {
        title,
        description,
        githubUrl,
        liveUrl,
    } = data;

    let { techStack } = data;

    if (title) project.title = title;

    if (description) project.description = description;

    if (githubUrl !== undefined)
        project.githubUrl = githubUrl;

    if (liveUrl !== undefined)
        project.liveUrl = liveUrl;

    if (techStack) {

        techStack = Array.isArray(techStack)
            ? techStack
            : techStack
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

        project.techStack = techStack;
    }

    // Replace Thumbnail
    if (file) {

        if (project.thumbnail?.public_id) {
            await deleteImage(project.thumbnail.public_id);
        }

        const uploadedImage = await uploadImage(file.buffer);

        project.thumbnail = {
            url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
        };
    }

    await project.save();

    return project.populate(
        "owner",
        "name username avatar"
    );

};

// ======================================================
// Delete Project
// ======================================================

const deleteProjectService = async (
    projectId,
    userId
) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    // Authorization
    if (project.owner.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this project"
        );
    }

    // Delete thumbnail from Cloudinary
    if (project.thumbnail?.public_id) {
        await deleteImage(project.thumbnail.public_id);
    }

    await project.deleteOne();

    return true;

};


// ======================================================
// Get My Projects
// ======================================================

const getMyProjectsService = async (userId) => {

    const projects = await Project.find({
        owner: userId,
    })
    .sort({ createdAt: -1 });

    return projects;

};


// ======================================================
// Get Projects Of Any User
// ======================================================

const getUserProjectsService = async (userId) => {

    const projects = await Project.find({

        owner: userId,

    })

    .populate(
        "owner",
        "name username avatar"
    )

    .sort({
        createdAt: -1,
    });

    return projects;

};

module.exports = {
    createProjectService,
    getAllProjectsService,
    getProjectByIdService,
    updateProjectService,
    deleteProjectService,
    getMyProjectsService,
    getUserProjectsService,
};