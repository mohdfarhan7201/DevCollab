import api from "../lib/axios";

// ======================================
// GET NOTIFICATIONS
// ======================================

export const getNotifications = async (
  page = 1,
  limit = 20
) => {
  const res = await api.get(
    `/notifications?page=${page}&limit=${limit}`
  );

  return res.data.data;
};

// ======================================
// MARK SINGLE AS READ
// ======================================

export const markNotificationRead = async (
  notificationId
) => {
  const res = await api.patch(
    `/notifications/${notificationId}/read`
  );

  return res.data.data;
};

// ======================================
// MARK ALL AS READ
// ======================================

export const markAllNotificationsRead =
  async () => {
    const res = await api.patch(
      "/notifications/read-all"
    );

    return res.data;
  };

// ======================================
// DELETE
// ======================================

export const deleteNotification = async (
  notificationId
) => {
  const res = await api.delete(
    `/notifications/${notificationId}`
  );

  return res.data;
};

// ======================================
// UNREAD COUNT
// ======================================

export const getUnreadCount = async () => {
  const res = await api.get(
    "/notifications/unread-count"
  );

  return res.data.data.unread;
};