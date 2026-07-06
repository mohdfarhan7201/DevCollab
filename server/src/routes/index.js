const express = require("express");

const router = express.Router();

const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const postRoutes = require("./post.routes");
const followRoutes = require("./follow.routes");
const feedRoutes = require("./feed.routes");
const searchRoutes = require("./search.routes");
const teamRoutes = require("./team.routes");
const notificationRoutes = require("./notification.routes");

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/posts", postRoutes);
router.use("/follow", followRoutes);
router.use("/feed", feedRoutes);
router.use("/search", searchRoutes);
router.use("/teams", teamRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;