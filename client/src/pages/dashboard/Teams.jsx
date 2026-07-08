import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  FolderKanban,
  Crown,
  Trash2,
  LogOut,
  Mail,
  X,
  UserPlus,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  getMyTeamsApi,
  createTeamApi,
  deleteTeamApi,
  leaveTeamApi,
} from "../../api/team.api";
import { sendInvitationApi } from "../../api/teamInvitation.api";
import { searchUsers } from "../../api/user.api";

export default function Teams() {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeTeamForInvite, setActiveTeamForInvite] = useState(null);

  // Form states
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [newTeamAvatar, setNewTeamAvatar] = useState(null);
  const [creatingTeam, setCreatingTeam] = useState(false);

  // Member Invite States
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [invitingUserMap, setInvitingUserMap] = useState({}); // userId -> loading status
  const [invitationMessage, setInvitationMessage] = useState("");

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyTeamsApi();
      setTeams(data || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  // Handle Create Team
  const handleCreateTeamSubmit = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    try {
      setCreatingTeam(true);
      await createTeamApi({
        name: newTeamName,
        description: newTeamDesc,
        avatar: newTeamAvatar,
      });

      setNewTeamName("");
      setNewTeamDesc("");
      setNewTeamAvatar(null);
      setShowCreateModal(false);
      loadTeams();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to create team");
    } finally {
      setCreatingTeam(false);
    }
  };

  // Handle User Search for Invitation
  useEffect(() => {
    if (!userSearchQuery.trim()) {
      setSearchedUsers([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const users = await searchUsers(userSearchQuery);
        setSearchedUsers(users || []);
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [userSearchQuery]);

  // Handle Send Invitation
  const handleSendInvitation = async (receiverId) => {
    if (!activeTeamForInvite) return;
    try {
      setInvitingUserMap((prev) => ({ ...prev, [receiverId]: true }));
      await sendInvitationApi({
        teamId: activeTeamForInvite._id,
        receiverId,
        message: invitationMessage,
      });
      alert(`Invitation sent successfully!`);
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Invitation failed");
    } finally {
      setInvitingUserMap((prev) => ({ ...prev, [receiverId]: false }));
    }
  };

  // Handle Delete Team
  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team? All members will be removed.")) return;
    try {
      await deleteTeamApi(teamId);
      loadTeams();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to delete team");
    }
  };

  // Handle Leave Team
  const handleLeaveTeam = async (teamId) => {
    if (!window.confirm("Are you sure you want to leave this team?")) return;
    try {
      await leaveTeamApi(teamId);
      loadTeams();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to leave team");
    }
  };

  // Filtered Teams
  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
            Teams
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your teams, invite members, and build collaborative workspaces.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 text-sm font-semibold transition shadow-md shadow-violet-600/20 active:scale-95 duration-200"
        >
          <Plus className="h-4 w-4" />
          Create Team
        </button>
      </div>

      {/* Search & Statistics Bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-background/50 pl-11 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground mr-2">
          <div>
            Total Teams: <span className="font-bold text-foreground">{teams.length}</span>
          </div>
          <div>
            Owned: <span className="font-bold text-foreground">
              {teams.filter((t) => t.owner && t.owner._id === user?._id).length}
            </span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <Loader2 className="h-10 w-10 text-violet-600 animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">Fetching teams...</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-center">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredTeams.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-card p-16 text-center">
          <Users className="mx-auto mb-5 h-14 w-14 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">No Teams Found</h2>
          <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
            {searchTerm ? "No match found for your search query." : "You are not a member of any teams yet."}
          </p>
        </div>
      )}

      {/* Teams Grid */}
      {!loading && !error && filteredTeams.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredTeams.map((team, index) => {
            const isOwner = team.owner && team.owner._id === user?._id;
            const fallbackColors = [
              "from-violet-600 to-fuchsia-600",
              "from-indigo-600 to-cyan-600",
              "from-pink-600 to-rose-600",
              "from-orange-600 to-amber-600",
              "from-emerald-600 to-teal-600",
            ];
            const chosenBg = fallbackColors[index % fallbackColors.length];

            return (
              <motion.div
                key={team._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`h-24 bg-gradient-to-r ${chosenBg} relative`}>
                    {team.avatar?.url ? (
                      <img
                        src={team.avatar.url}
                        alt={team.name}
                        className="absolute bottom-[-24px] left-6 h-16 w-16 rounded-2xl border-4 border-card bg-background object-cover shadow-lg"
                      />
                    ) : (
                      <div className="absolute bottom-[-24px] left-6 h-16 w-16 rounded-2xl border-4 border-card bg-violet-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                        {team.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="p-6 pt-10">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-foreground line-clamp-1">{team.name}</h2>
                      <div className="flex gap-2">
                        {isOwner ? (
                          <button
                            onClick={() => handleDeleteTeam(team._id)}
                            title="Delete Team"
                            className="p-2 text-rose-600 hover:bg-rose-500/10 rounded-lg transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleLeaveTeam(team._id)}
                            title="Leave Team"
                            className="p-2 text-orange-600 hover:bg-orange-500/10 rounded-lg transition"
                          >
                            <LogOut className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 h-10">
                      {team.description || "No description provided."}
                    </p>

                    <div className="mt-5 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-foreground">
                          {team.owner?.name || "Unknown Author"}
                        </span>
                        <span className="text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">Owner</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-violet-500" />
                        <span>{team.members?.length || 0} Members</span>
                      </div>
                    </div>

                    {/* Members Avatars Row */}
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Team Members</p>
                      <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
                        {team.members?.slice(0, 8).map((mem) => {
                          const memUser = mem.user;
                          if (!memUser) return null;
                          return (
                            <img
                              key={memUser._id}
                              src={memUser.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(memUser.name)}`}
                              alt={memUser.name}
                              title={`${memUser.name} (${mem.role})`}
                              className="h-8 w-8 rounded-full border border-card object-cover"
                            />
                          );
                        })}
                        {team.members?.length > 8 && (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                            +{team.members.length - 8}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <button
                    onClick={() => {
                      setActiveTeamForInvite(team);
                      setShowInviteModal(true);
                    }}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 py-3 text-sm font-medium transition hover:bg-violet-600 hover:text-white hover:border-violet-600"
                  >
                    <UserPlus className="h-4 w-4" />
                    Invite Members
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create Team Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-card p-6 shadow-2xl"
            >
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-xl transition"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-bold mb-4">Create New Team</h2>

              <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Team Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Design Wizards"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-background px-4 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Description</label>
                  <textarea
                    placeholder="What is this team focused on?"
                    rows="3"
                    value={newTeamDesc}
                    onChange={(e) => setNewTeamDesc(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-background p-4 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Avatar / logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewTeamAvatar(e.target.files[0])}
                    className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-600 hover:file:bg-violet-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={creatingTeam}
                  className="w-full inline-flex justify-center items-center h-11 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition active:scale-95 duration-200 shadow-md shadow-violet-600/20"
                >
                  {creatingTeam ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Team"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Invite Member Modal */}
      <AnimatePresence>
        {showInviteModal && activeTeamForInvite && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-card p-6 shadow-2xl"
            >
              <button
                onClick={() => {
                  setShowInviteModal(false);
                  setUserSearchQuery("");
                  setSearchedUsers([]);
                  setInvitationMessage("");
                }}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-xl transition"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-bold mb-1">Invite to {activeTeamForInvite.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Search DevCollab users by name or username to invite them to this team.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Custom Message</label>
                  <input
                    type="text"
                    placeholder="Optional message (e.g., Let's construct a premium UI!)"
                    value={invitationMessage}
                    onChange={(e) => setInvitationMessage(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-background px-4 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    placeholder="Search users by name..."
                    className="h-11 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-background pl-11 pr-4 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {searchedUsers.length > 0 ? (
                    searchedUsers.map((item) => {
                      const isAlreadyTeamMember = activeTeamForInvite.members?.some(
                        (m) => m.user && m.user._id === item._id
                      );
                      const isInvitedLoading = invitingUserMap[item._id];

                      return (
                        <div
                          key={item._id}
                          className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-muted/50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}`}
                              alt={item.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">@{item.username}</p>
                            </div>
                          </div>

                          {isAlreadyTeamMember ? (
                            <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-2.5 py-1 rounded-lg">
                              Already Member
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSendInvitation(item._id)}
                              disabled={isInvitedLoading}
                              className="inline-flex items-center gap-1 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:bg-muted py-2 px-3.5 rounded-xl transition"
                            >
                              {isInvitedLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Invite"
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    userSearchQuery.trim() && (
                      <p className="text-sm text-center text-muted-foreground p-4">No users found.</p>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}