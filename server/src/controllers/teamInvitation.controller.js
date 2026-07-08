const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  sendInvitationService,
  getMyInvitationsService,
  acceptInvitationService,
  rejectInvitationService,
} = require("../services/teamInvitation.service");

// ======================================
// SEND INVITATION
// ======================================

const sendInvitation = asyncHandler(
  async (req, res) => {
    const invitation =
      await sendInvitationService({
        teamId: req.params.teamId,
        senderId: req.user._id,
        receiverId: req.body.receiverId,
        role: req.body.role,
        message: req.body.message,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Invitation sent successfully",
        invitation
      )
    );
  }
);

// ======================================
// GET MY INVITATIONS
// ======================================

const getMyInvitations = asyncHandler(
  async (req, res) => {
    const invitations =
      await getMyInvitationsService(
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Invitations fetched successfully",
        invitations
      )
    );
  }
);

// ======================================
// ACCEPT INVITATION
// ======================================

const acceptInvitation = asyncHandler(
  async (req, res) => {
    const invitation =
      await acceptInvitationService(
        req.params.invitationId,
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Invitation accepted successfully",
        invitation
      )
    );
  }
);

// ======================================
// REJECT INVITATION
// ======================================

const rejectInvitation = asyncHandler(
  async (req, res) => {
    const invitation =
      await rejectInvitationService(
        req.params.invitationId,
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Invitation rejected successfully",
        invitation
      )
    );
  }
);

module.exports = {
  sendInvitation,
  getMyInvitations,
  acceptInvitation,
  rejectInvitation,
};