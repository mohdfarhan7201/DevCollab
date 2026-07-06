import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
  updateAvatar,
} from "../../api/user.api";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileProjects from "../../components/profile/ProfileProjects";
import EditProfileModal from "../../components/profile/EditProfileModal";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);

  // =========================
  // LOAD PROFILE
  // =========================

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleUpdateProfile = async (values) => {
    try {
      const updated = await updateProfile(values);

      setProfile(updated);

      setOpenEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // UPDATE AVATAR
  // =========================

  const handleAvatarChange = async (file) => {
    try {
      const updated = await updateAvatar(file);

      setProfile(updated);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Failed to load profile.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      {/* Header */}

      <ProfileHeader
        profile={profile}
        onEdit={() => setOpenEdit(true)}
        onAvatarChange={handleAvatarChange}
      />

      {/* Info */}

      <ProfileInfo profile={profile} />

      {/* Projects */}

      <ProfileProjects />

      {/* Edit Modal */}

      <EditProfileModal
        open={openEdit}
        profile={profile}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdateProfile}
      />
    </div>
  );
}