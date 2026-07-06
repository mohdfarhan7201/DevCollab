const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  createTeamService,
  getMyTeamsService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
  inviteMemberService,
  removeMemberService,
  leaveTeamService,
  searchTeamsService,
  getAllTeamsService,
} = require("../services/team.service");

// ======================================================
// CREATE TEAM
// ======================================================

const createTeam = asyncHandler(async (req, res) => {
  const team = await createTeamService(
    req.user._id,
    req.body,
    req.file
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      "Team created successfully",
      team
    )
  );
});

// ======================================================
// GET MY TEAMS
// ======================================================

const getMyTeams = asyncHandler(async (req, res) => {
  const teams = await getMyTeamsService(
    req.user._id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Teams fetched successfully",
      teams
    )
  );
});

// ======================================================
// GET TEAM BY ID
// ======================================================

const getTeamById = asyncHandler(async (req, res) => {
  const team = await getTeamByIdService(
    req.params.teamId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Team fetched successfully",
      team
    )
  );
});

// ======================================================
// UPDATE TEAM
// ======================================================

const updateTeam = asyncHandler(async (req, res) => {
  const team = await updateTeamService(
    req.params.teamId,
    req.user._id,
    req.body,
    req.file
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Team updated successfully",
      team
    )
  );
});

// ======================================================
// DELETE TEAM
// ======================================================

const deleteTeam = asyncHandler(async (req, res) => {
  await deleteTeamService(
    req.params.teamId,
    req.user._id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Team deleted successfully"
    )
  );
});

// ======================================================
// INVITE MEMBER
// ======================================================

const inviteMember = asyncHandler(async (req, res) => {
  const team = await inviteMemberService(
    req.params.teamId,
    req.user._id,
    req.body.userId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Member added successfully",
      team
    )
  );
});

// ======================================================
// REMOVE MEMBER
// ======================================================

const removeMember = asyncHandler(async (req, res) => {
  const team = await removeMemberService(
    req.params.teamId,
    req.user._id,
    req.body.userId
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Member removed successfully",
      team
    )
  );
});

// ======================================================
// LEAVE TEAM
// ======================================================

const leaveTeam = asyncHandler(async (req, res) => {
  const result = await leaveTeamService(
    req.params.teamId,
    req.user._id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result.message
    )
  );
});

// ======================================================
// SEARCH TEAMS
// ======================================================

const searchTeams = asyncHandler(async (req, res) => {
  const teams = await searchTeamsService(
    req.query.q || ""
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Teams fetched successfully",
      teams
    )
  );
});

// ======================================================
// GET ALL TEAMS
// ======================================================

const getAllTeams = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
  } = req.query;

  const result =
    await getAllTeamsService(
      page,
      limit
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Teams fetched successfully",
      result
    )
  );
});

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
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
};