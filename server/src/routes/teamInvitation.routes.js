const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
  sendInvitation,
  getMyInvitations,
  acceptInvitation,
  rejectInvitation,
} = require("../controllers/teamInvitation.controller");

// ======================================
// PROTECTED ROUTES
// ======================================

router.use(verifyJWT);

// ======================================
// GET MY INVITATIONS
// ======================================

router.get(
  "/",
  getMyInvitations
);

// ======================================
// SEND INVITATION
// ======================================

router.post(
  "/:teamId",
  sendInvitation
);

// ======================================
// ACCEPT INVITATION
// ======================================

router.patch(
  "/:invitationId/accept",
  acceptInvitation
);

// ======================================
// REJECT INVITATION
// ======================================

router.patch(
  "/:invitationId/reject",
  rejectInvitation
);

module.exports = router;