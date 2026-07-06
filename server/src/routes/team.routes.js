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
// CREATE TEAM
// ======================================================

router.post(
  "/",
  verifyJWT,
  upload.single("avatar"),
  createTeam
);

// ======================================================
// GET MY TEAMS
// ======================================================

router.get(
  "/my-teams",
  verifyJWT,
  getMyTeams
);

// ======================================================
// SEARCH TEAMS
// ======================================================

router.get(
  "/search",
  verifyJWT,
  searchTeams
);

// ======================================================
// GET ALL TEAMS
// ======================================================

router.get(
  "/",
  verifyJWT,
  getAllTeams
);

// ======================================================
// GET TEAM BY ID
// ======================================================

router.get(
  "/:teamId",
  verifyJWT,
  getTeamById
);

// ======================================================
// UPDATE TEAM
// ======================================================

router.patch(
  "/:teamId",
  verifyJWT,
  upload.single("avatar"),
  updateTeam
);

// ======================================================
// DELETE TEAM
// ======================================================

router.delete(
  "/:teamId",
  verifyJWT,
  deleteTeam
);

// ======================================================
// INVITE MEMBER
// ======================================================

router.patch(
  "/:teamId/invite",
  verifyJWT,
  inviteMember
);

// ======================================================
// REMOVE MEMBER
// ======================================================

router.patch(
  "/:teamId/remove-member",
  verifyJWT,
  removeMember
);

// ======================================================
// LEAVE TEAM
// ======================================================

router.patch(
  "/:teamId/leave",
  verifyJWT,
  leaveTeam
);

module.exports = router;