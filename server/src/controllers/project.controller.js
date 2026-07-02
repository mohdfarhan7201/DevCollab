const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    createProjectService,
    getAllProjectsService,
    getProjectByIdService,
    updateProjectService,
    deleteProjectService,
    getMyProjectsService,
    getUserProjectsService,
} = require("../services/project.service");

const {
    toggleLikeService,
} = require("../services/like.service");

// ======================================================
// Create Project
// ======================================================

const createProject = asyncHandler(async (req, res) => {

    const project = await createProjectService(
        req.user._id,
        req.body,
        req.file
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Project created successfully",
            project
        )
    );

});

// ======================================================
// Get All Projects
// ======================================================

const getAllProjects = asyncHandler(async (req, res) => {

    const {
    q,
    page,
    limit,
} = req.query;

const result =
await getAllProjectsService(
    q,
    page,
    limit
);
return res.status(200).json(
    new ApiResponse(
        200,
        "Projects fetched successfully",
        result
    )
);

    // return res.status(200).json(
    //     new ApiResponse(
    //         200,
    //         "Projects fetched successfully",
    //         projects
    //     )
    // );

});

// ======================================================
// Get Project By ID
// ======================================================

const getProjectById = asyncHandler(async (req, res) => {

    const project = await getProjectByIdService(
        req.params.projectId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Project fetched successfully",
            project
        )
    );

});

// ======================================================
// Update Project
// ======================================================

const updateProject = asyncHandler(async (req, res) => {

    const project = await updateProjectService(
        req.params.projectId,
        req.user._id,
        req.body,
        req.file
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Project updated successfully",
            project
        )
    );

});

// ======================================================
// Delete Project
// ======================================================

const deleteProject = asyncHandler(async (req, res) => {

    await deleteProjectService(
        req.params.projectId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Project deleted successfully"
        )
    );

});


const getMyProjects = asyncHandler(async (req, res) => {

    const projects = await getMyProjectsService(
        req.user._id
    );

    return res.status(200).json(

        new ApiResponse(
            200,
            "Projects fetched successfully",
            projects
        )

    );

});


const getUserProjects = asyncHandler(async (req, res) => {

    const projects = await getUserProjectsService(

        req.params.userId

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            "User projects fetched successfully",

            projects

        )

    );

});


const toggleLike = asyncHandler(async (req, res) => {

    const result = await toggleLikeService(

        req.params.projectId,

        req.user._id

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            result.liked

                ? "Liked successfully"

                : "Unliked successfully",

            result

        )

    );

});


module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getMyProjects,
    getUserProjects,
    toggleLike,
};