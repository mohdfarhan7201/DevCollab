const express = require("express");

const router = express.Router();

const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const postRoutes = require("./post.routes");
const followRoutes = require("./follow.routes");

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/posts", postRoutes);
router.use("/follow", followRoutes);

module.exports = router;