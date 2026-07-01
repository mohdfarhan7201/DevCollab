const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
    createProjectService,
    getAllProjectsService,
    getProjectByIdService,
} = require("../services/project.service");

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


const getAllProjects = asyncHandler(async (req, res) => {

    const projects = await getAllProjectsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Projects fetched successfully",
            projects
        )
    );

});

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

module.exports = {

    createProject,
    getAllProjects,
    getProjectById,

};