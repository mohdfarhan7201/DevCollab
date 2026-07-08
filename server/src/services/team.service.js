const Team = require("../models/team.model");
const User = require("../models/user.model");

const ApiError = require("../utils/apiError");
const createNotification = require("./notification.helper");

const {
  uploadImage,
  deleteImage,
} = require("./cloudinary.service");

// ======================================================
// CREATE TEAM
// ======================================================

const createTeamService = async (
  ownerId,
  teamData,
  file
) => {
  const {
    name,
    description,
  } = teamData;

  const existingTeam = await Team.findOne({
    name: name.trim(),
  });

  if (existingTeam) {
    throw new ApiError(
      409,
      "Team name already exists"
    );
  }

  let avatar = {
    url: "",
    public_id: "",
  };

  if (file) {
    const uploadedImage =
      await uploadImage(file.buffer);

    avatar = {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    };
  }

  const team = await Team.create({
    name: name.trim(),
    description:
      description?.trim() || "",

    avatar,

    owner: ownerId,

    members: [
      {
        user: ownerId,
        role: "OWNER",
      },
    ],
  });

  return await Team.findById(team._id)
    .populate(
      "owner",
      "name username avatar"
    )
    .populate(
      "members.user",
      "name username avatar"
    );
};

// ======================================================
// GET MY TEAMS
// ======================================================

const getMyTeamsService = async (
  userId
) => {
  return await Team.find({
    "members.user": userId,
  })
    .populate(
      "owner",
      "name username avatar"
    )
    .populate(
      "members.user",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    });
};

// ======================================================
// GET TEAM BY ID
// ======================================================

const getTeamByIdService = async (
  teamId
) => {
  const team =
    await Team.findById(teamId)
      .populate(
        "owner",
        "name username avatar bio"
      )
      .populate(
        "members.user",
        "name username avatar bio"
      );

  if (!team) {
    throw new ApiError(
      404,
      "Team not found"
    );
  }

  return team;
};

// ======================================================
// UPDATE TEAM
// ======================================================

const updateTeamService = async (
  teamId,
  userId,
  data,
  file
) => {
  const team =
    await Team.findById(teamId);

  if (!team) {
    throw new ApiError(
      404,
      "Team not found"
    );
  }

  const isOwner =
    team.owner.toString() ===
    userId.toString();

  if (!isOwner) {
    throw new ApiError(
      403,
      "Only owner can update the team"
    );
  }

  if (data.name) {
    const existingTeam =
      await Team.findOne({
        name: data.name.trim(),
        _id: {
          $ne: teamId,
        },
      });

    if (existingTeam) {
      throw new ApiError(
        409,
        "Team name already exists"
      );
    }

    team.name =
      data.name.trim();
  }

  if (
    data.description !== undefined
  ) {
    team.description =
      data.description.trim();
  }

  if (file) {
    if (
      team.avatar.public_id
    ) {
      await deleteImage(
        team.avatar.public_id
      );
    }

    const uploadedImage =
      await uploadImage(
        file.buffer
      );

    team.avatar = {
      url:
        uploadedImage.secure_url,
      public_id:
        uploadedImage.public_id,
    };
  }

  await team.save();

  return await Team.findById(
    team._id
  )
    .populate(
      "owner",
      "name username avatar"
    )
    .populate(
      "members.user",
      "name username avatar"
    );
};

// ======================================================
// DELETE TEAM
// ======================================================

const deleteTeamService = async (
  teamId,
  userId
) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new ApiError(
      404,
      "Team not found"
    );
  }

  if (
    team.owner.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Only owner can delete the team"
    );
  }

  if (team.avatar.public_id) {
    await deleteImage(
      team.avatar.public_id
    );
  }

  await team.deleteOne();

  return;
};

// ======================================================
// INVITE MEMBER
// ======================================================

const inviteMemberService = async (
  teamId,
  currentUserId,
  memberId
) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new ApiError(
      404,
      "Team not found"
    );
  }

  const currentMember =
    team.members.find(
      (member) =>
        member.user.toString() ===
        currentUserId.toString()
    );

  if (!currentMember) {
    throw new ApiError(
      403,
      "You are not a team member"
    );
  }

  if (
    !["OWNER", "ADMIN"].includes(
      currentMember.role
    )
  ) {
    throw new ApiError(
      403,
      "Only owner/admin can invite members"
    );
  }

  const user =
    await User.findById(memberId);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const alreadyMember =
    team.members.some(
      (member) =>
        member.user.toString() ===
        memberId.toString()
    );

  if (alreadyMember) {
    throw new ApiError(
      409,
      "User is already a member"
    );
  }

  team.members.push({
    user: memberId,
    role: "MEMBER",
  });

  await team.save();

  try {
    await createNotification({
      recipient: memberId,
      sender: currentUserId,
      type: "team",
      title: "Joined Team",
      message: `You have been added to ${team.name}.`,
      metadata: {
        team: team._id,
      },
      link: `/dashboard/teams`,
    });
  } catch (error) {
    console.error("Error creating joined team notification:", error.message);
  }

  return await Team.findById(team._id)
    .populate(
      "owner",
      "name username avatar"
    )
    .populate(
      "members.user",
      "name username avatar"
    );
};

// ======================================================
// REMOVE MEMBER
// ======================================================

const removeMemberService = async (
  teamId,
  currentUserId,
  memberId
) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new ApiError(
      404,
      "Team not found"
    );
  }

  const currentMember =
    team.members.find(
      (member) =>
        member.user.toString() ===
        currentUserId.toString()
    );

  if (!currentMember) {
    throw new ApiError(
      403,
      "You are not a team member"
    );
  }

  if (
    !["OWNER", "ADMIN"].includes(
      currentMember.role
    )
  ) {
    throw new ApiError(
      403,
      "Only owner/admin can remove members"
    );
  }

  if (
    memberId.toString() ===
    team.owner.toString()
  ) {
    throw new ApiError(
      400,
      "Owner cannot be removed"
    );
  }

  team.members =
    team.members.filter(
      (member) =>
        member.user.toString() !==
        memberId.toString()
    );

  await team.save();

  return await Team.findById(team._id)
    .populate(
      "owner",
      "name username avatar"
    )
    .populate(
      "members.user",
      "name username avatar"
    );
};

// ======================================================
// LEAVE TEAM
// ======================================================

const leaveTeamService = async (
  teamId,
  userId
) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new ApiError(
      404,
      "Team not found"
    );
  }

  if (
    team.owner.toString() ===
    userId.toString()
  ) {
    throw new ApiError(
      400,
      "Owner cannot leave the team. Transfer ownership or delete the team."
    );
  }

  const isMember =
    team.members.some(
      (member) =>
        member.user.toString() ===
        userId.toString()
    );

  if (!isMember) {
    throw new ApiError(
      400,
      "You are not a member of this team"
    );
  }

  team.members =
    team.members.filter(
      (member) =>
        member.user.toString() !==
        userId.toString()
    );

  await team.save();

  return {
    message:
      "You left the team successfully",
  };
};

// ======================================================
// SEARCH TEAMS
// ======================================================

const searchTeamsService = async (
  query = ""
) => {
  return await Team.find({
    name: {
      $regex: query,
      $options: "i",
    },
  })
    .populate(
      "owner",
      "name username avatar"
    )
    .populate(
      "members.user",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    });
};

// ======================================================
// GET ALL TEAMS (PAGINATION)
// ======================================================

const getAllTeamsService = async (
  page = 1,
  limit = 10
) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const teams = await Team.find()
    .populate(
      "owner",
      "name username avatar"
    )
    .populate(
      "members.user",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const total =
    await Team.countDocuments();

  return {
    teams,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
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
};