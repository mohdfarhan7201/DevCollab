const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  createTeam,
  getMyTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  inviteMember,
  removeMember,
  leaveTeam,
  searchTeams,
  getAllTeams,
} = require("../controllers/team.controller");

// ======================================================
// PROTECTED ROUTES
// ======================================================

router.use(verifyJWT);

// Create Team
router.post("/", upload.single("avatar"), createTeam);

// Get My Teams
router.get("/my-teams", getMyTeams);

// Search Teams
router.get("/search", searchTeams);

// Get All Teams
router.get("/", getAllTeams);

// Get Team by ID
router.get("/:teamId", getTeamById);

// Update Team
router.patch("/:teamId", upload.single("avatar"), updateTeam);

// Delete Team
router.delete("/:teamId", deleteTeam);

// Invite Member
router.patch("/:teamId/invite", inviteMember);

// Remove Member
router.patch("/:teamId/remove-member", removeMember);

// Leave Team
router.patch("/:teamId/leave", leaveTeam);

module.exports = router;