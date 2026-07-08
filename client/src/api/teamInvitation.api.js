import api from "../lib/axios";

// ======================================
// GET MY INVITATIONS
// ======================================

export const getMyInvitationsApi =
  async () => {
    const { data } =
      await api.get(
        "/team-invitations"
      );

    return data.data;
  };

// ======================================
// SEND INVITATION
// ======================================

export const sendInvitationApi =
  async ({
    teamId,
    receiverId,
    role = "Member",
    message = "",
  }) => {
    const { data } =
      await api.post(
        `/team-invitations/${teamId}`,
        {
          receiverId,
          role,
          message,
        }
      );

    return data.data;
  };

// ======================================
// ACCEPT INVITATION
// ======================================

export const acceptInvitationApi =
  async (
    invitationId
  ) => {
    const { data } =
      await api.patch(
        `/team-invitations/${invitationId}/accept`
      );

    return data.data;
  };

// ======================================
// REJECT INVITATION
// ======================================

export const rejectInvitationApi =
  async (
    invitationId
  ) => {
    const { data } =
      await api.patch(
        `/team-invitations/${invitationId}/reject`
      );

    return data.data;
  };