import api from "../lib/axios";

// =====================================
// GET MY NOTIFICATIONS
// =====================================

export const getNotificationsApi = async () => {
  const { data } = await api.get("/notifications");

  return data.data;
};

// =====================================
// MARK AS READ
// =====================================

export const markNotificationReadApi = async (
  notificationId
) => {
  const { data } = await api.patch(
    `/notifications/${notificationId}/read`
  );

  return data.data;
};

// =====================================
// MARK ALL AS READ
// =====================================

export const markAllNotificationsReadApi =
  async () => {
    const { data } = await api.patch(
      "/notifications/read-all"
    );

    return data;
  };

// =====================================
// DELETE NOTIFICATION
// =====================================

export const deleteNotificationApi = async (
  notificationId
) => {
  const { data } = await api.delete(
    `/notifications/${notificationId}`
  );

  return data;
};