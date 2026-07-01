const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    createProject,
    getAllProjects,
    getProjectById,
} = require("../controllers/project.controller");

router.post(
    "/",
    verifyJWT,
    upload.single("thumbnail"),
    createProject
);

router.get(
    "/",
    verifyJWT,
    getAllProjects
);

router.get(
    "/:projectId",
    verifyJWT,
    getProjectById
);

module.exports = router;