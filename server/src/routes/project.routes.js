const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getMyProjects,
    getUserProjects,
} = require("../controllers/project.controller");

// Create Project
router.post(
    "/",
    verifyJWT,
    upload.single("thumbnail"),
    createProject
);

// Get All Projects
router.get(
    "/",
    verifyJWT,
    getAllProjects
);

// Get My Projects
router.get(
    "/my-projects",
    verifyJWT,
    getMyProjects
);

//Get User Id 
router.get(
    "/user/:userId",
    verifyJWT,
    getUserProjects
);

// Get Single Project
router.get(
    "/:projectId",
    verifyJWT,
    getProjectById
);

// Update Project
router.patch(
    "/:projectId",
    verifyJWT,
    upload.single("thumbnail"),
    updateProject
);

// Delete Project
router.delete(
    "/:projectId",
    verifyJWT,
    deleteProject
);

router.post(

    "/:projectId/like",

    verifyJWT,

    toggleLike

);


module.exports = router;