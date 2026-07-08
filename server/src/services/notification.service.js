const Notification = require("../models/notification.model");
const ApiError = require("../utils/apiError");

// ======================================
// GET MY NOTIFICATIONS
// ======================================

const getMyNotificationsService = async (
  userId
) => {
  return await Notification.find({
    recipient: userId,
  })
    .populate(
      "sender",
      "name username avatar"
    )
    .sort({
      createdAt: -1,
    });
};

// ======================================
// MARK NOTIFICATION AS READ
// ======================================

const markNotificationReadService =
  async (
    notificationId,
    userId
  ) => {
    const notification =
      await Notification.findOne({
        _id: notificationId,
        recipient: userId,
      });

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    notification.isRead = true;

    await notification.save();

    return notification;
  };

// ======================================
// MARK ALL NOTIFICATIONS AS READ
// ======================================

const markAllNotificationsReadService =
  async (userId) => {
    await Notification.updateMany(
      {
        recipient: userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    return true;
  };

// ======================================
// DELETE NOTIFICATION
// ======================================

const deleteNotificationService =
  async (
    notificationId,
    userId
  ) => {
    const notification =
      await Notification.findOne({
        _id: notificationId,
        recipient: userId,
      });

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    await notification.deleteOne();

    return true;
  };

module.exports = {
  getMyNotificationsService,
  markNotificationReadService,
  markAllNotificationsReadService,
  deleteNotificationService,
};