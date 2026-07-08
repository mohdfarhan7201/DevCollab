import { useCallback, useEffect, useState } from "react";

import {
  getMyInvitationsApi,
  sendInvitationApi,
  acceptInvitationApi,
  rejectInvitationApi,
} from "../api/teamInvitation.api";

const useTeamInvitations = () => {
  const [invitations, setInvitations] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // =====================================
  // GET INVITATIONS
  // =====================================

  const fetchInvitations =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getMyInvitationsApi();

        setInvitations(data || []);
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            err.message
        );
      } finally {
        setLoading(false);
      }
    }, []);

  // =====================================
  // SEND INVITATION
  // =====================================

  const sendInvitation =
    async (payload) => {
      try {
        const invitation =
          await sendInvitationApi(
            payload
          );

        return invitation;
      } catch (err) {
        console.error(err);

        throw err;
      }
    };

  // =====================================
  // ACCEPT INVITATION
  // =====================================

  const acceptInvitation =
    async (invitationId) => {
      try {
        const invitation =
          await acceptInvitationApi(
            invitationId
          );

        setInvitations((prev) =>
          prev.filter(
            (item) =>
              item._id !== invitationId
          )
        );

        return invitation;
      } catch (err) {
        console.error(err);

        throw err;
      }
    };

  // =====================================
  // REJECT INVITATION
  // =====================================

  const rejectInvitation =
    async (invitationId) => {
      try {
        const invitation =
          await rejectInvitationApi(
            invitationId
          );

        setInvitations((prev) =>
          prev.filter(
            (item) =>
              item._id !== invitationId
          )
        );

        return invitation;
      } catch (err) {
        console.error(err);

        throw err;
      }
    };

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return {
    invitations,
    loading,
    error,

    fetchInvitations,

    sendInvitation,
    acceptInvitation,
    rejectInvitation,
  };
};

export default useTeamInvitations;