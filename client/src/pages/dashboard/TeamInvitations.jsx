import {
  Check,
  X,
  Users,
  Mail,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import useTeamInvitations from "../../hooks/useTeamInvitations";

export default function TeamInvitations() {
  const {
    invitations,
    loading,
    acceptInvitation,
    rejectInvitation,
  } = useTeamInvitations();

  const handleAccept = async (id) => {
    try {
      await acceptInvitation(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectInvitation(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3">
            <Mail className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Team Invitations
            </h1>

            <p className="text-muted-foreground">
              Manage all invitations sent to
              you.
            </p>
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            Loading invitations...
          </div>
        )}

        {/* Empty */}

        {!loading &&
          invitations.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-16 text-center">
              <Users className="mx-auto mb-5 h-14 w-14 text-muted-foreground" />

              <h2 className="text-2xl font-semibold">
                No Invitations
              </h2>

              <p className="mt-2 text-muted-foreground">
                You're not invited to any
                team yet.
              </p>
            </div>
          )}

        {/* Invitations */}

        <div className="grid gap-6">
          {invitations.map(
            (invitation) => (
              <div
                key={invitation._id}
                className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        invitation.team?.logo ||
                        "https://ui-avatars.com/api/?name=Team"
                      }
                      alt=""
                      className="h-16 w-16 rounded-2xl object-cover"
                    />

                    <div>
                      <h2 className="text-xl font-semibold">
                        {
                          invitation.team
                            ?.name
                        }
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Invited by{" "}
                        <span className="font-medium text-foreground">
                          {
                            invitation
                              .sender
                              ?.name
                          }
                        </span>
                      </p>

                      {invitation.message && (
                        <p className="mt-3 rounded-xl bg-muted p-3 text-sm">
                          "
                          {
                            invitation.message
                          }
                          "
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        Role:
                        <span className="rounded-lg bg-primary/10 px-2 py-1 text-primary">
                          {
                            invitation.role
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleAccept(
                          invitation._id
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
                    >
                      <Check className="h-5 w-5" />
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleReject(
                          invitation._id
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}