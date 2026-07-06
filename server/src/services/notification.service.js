const Notification = require("../models/notification.model");

// ======================================================
// CREATE NOTIFICATION
// ======================================================

const createNotificationService = async ({
  recipient,
  sender,
  type,
  title,
  message,
  link = "",
  metadata = {},
}) => {
  return Notification.create({
    recipient,
    sender,
    type,
    title,
    message,
    link,
    metadata,
  });
};

// ======================================================
// GET MY NOTIFICATIONS
// ======================================================

const getNotificationsService = async (
  userId,
  page = 1,
  limit = 20
) => {
  page = Number(page);
  limit = Number(limit);

  const notifications =
    await Notification.find({
      recipient: userId,
    })
      .populate(
        "sender",
        "name username avatar"
      )
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

  const total = await Notification.countDocuments({
    recipient: userId,
  });

  return {
    notifications,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

// ======================================================
// MARK AS READ
// ======================================================

const markAsReadService = async (
  notificationId,
  userId
) => {
  return Notification.findOneAndUpdate(
    {
      _id: notificationId,
      recipient: userId,
    },
    {
      read: true,
    },
    {
      new: true,
    }
  );
};

// ======================================================
// MARK ALL READ
// ======================================================

const markAllReadService = async (
  userId
) => {
  await Notification.updateMany(
    {
      recipient: userId,
      read: false,
    },
    {
      read: true,
    }
  );
};

// ======================================================
// DELETE
// ======================================================

const deleteNotificationService = async (
  id,
  userId
) => {
  await Notification.findOneAndDelete({
    _id: id,
    recipient: userId,
  });
};

// ======================================================
// UNREAD COUNT
// ======================================================

const unreadCountService = async (
  userId
) => {
  return Notification.countDocuments({
    recipient: userId,
    read: false,
  });
};

module.exports = {
  createNotificationService,
  getNotificationsService,
  markAsReadService,
  markAllReadService,
  deleteNotificationService,
  unreadCountService,
};