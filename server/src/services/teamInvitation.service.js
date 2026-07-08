const TeamInvitation = require("../models/teamInvitation.model");
const Team = require("../models/team.model");
const User = require("../models/user.model");
const createNotification = require("./notification.helper");
const ApiError = require("../utils/apiError");

// ======================================
// SEND INVITATION
// ======================================

const sendInvitationService = async ({
  teamId,
  senderId,
  receiverId,
  role = "Member",
  message = "",
}) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new ApiError(404, "Team not found");
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new ApiError(404, "User not found");
  }

  const alreadyInvited =
    await TeamInvitation.findOne({
      team: teamId,
      receiver: receiverId,
      status: "pending",
    });

  if (alreadyInvited) {
    throw new ApiError(
      400,
      "Invitation already sent"
    );
  }

  const invitation =
    await TeamInvitation.create({
      team: teamId,
      sender: senderId,
      receiver: receiverId,
      role,
      message,
    });

  await createNotification({
    recipient: receiverId,
    sender: senderId,
    type: "team",
    title: "Team Invitation",
    message: `invited you to join ${team.name}`,
    reference: teamId,
  });

  return await TeamInvitation.findById(
    invitation._id
  )
    .populate(
      "team",
      "name logo"
    )
    .populate(
      "sender",
      "name username avatar"
    )
    .populate(
      "receiver",
      "name username avatar"
    );
};

// ======================================
// GET MY INVITATIONS
// ======================================

const getMyInvitationsService =
  async (userId) => {
    return await TeamInvitation.find({
      receiver: userId,
      status: "pending",
    })
      .populate(
        "team",
        "name logo description"
      )
      .populate(
        "sender",
        "name username avatar"
      )
      .sort({
        createdAt: -1,
      });
  };

// ======================================
// ACCEPT INVITATION
// ======================================

const acceptInvitationService =
  async (
    invitationId,
    userId
  ) => {
    const invitation =
      await TeamInvitation.findOne({
        _id: invitationId,
        receiver: userId,
      });

    if (!invitation) {
      throw new ApiError(
        404,
        "Invitation not found"
      );
    }

    if (
      invitation.status !== "pending"
    ) {
      throw new ApiError(
        400,
        "Invitation already handled"
      );
    }

    invitation.status = "accepted";

    await invitation.save();

    await Team.findByIdAndUpdate(
      invitation.team,
      {
        $addToSet: {
          members: userId,
        },
      }
    );

    return invitation;
  };

// ======================================
// REJECT INVITATION
// ======================================

const rejectInvitationService =
  async (
    invitationId,
    userId
  ) => {
    const invitation =
      await TeamInvitation.findOne({
        _id: invitationId,
        receiver: userId,
      });

    if (!invitation) {
      throw new ApiError(
        404,
        "Invitation not found"
      );
    }

    invitation.status =
      "rejected";

    await invitation.save();

    return invitation;
  };

module.exports = {
  sendInvitationService,
  getMyInvitationsService,
  acceptInvitationService,
  rejectInvitationService,
};