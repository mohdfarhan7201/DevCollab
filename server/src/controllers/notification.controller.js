const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  getMyNotificationsService,
  markNotificationReadService,
  markAllNotificationsReadService,
  deleteNotificationService,
} = require("../services/notification.service");

// ======================================
// GET MY NOTIFICATIONS
// ======================================

const getMyNotifications = asyncHandler(
  async (req, res) => {
    const notifications =
      await getMyNotificationsService(
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Notifications fetched successfully",
        notifications
      )
    );
  }
);

// ======================================
// MARK AS READ
// ======================================

const markAsRead = asyncHandler(
  async (req, res) => {
    const notification =
      await markNotificationReadService(
        req.params.notificationId,
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Notification marked as read",
        notification
      )
    );
  }
);

// ======================================
// MARK ALL AS READ
// ======================================

const markAllAsRead = asyncHandler(
  async (req, res) => {
    await markAllNotificationsReadService(
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "All notifications marked as read"
      )
    );
  }
);

// ======================================
// DELETE NOTIFICATION
// ======================================

const deleteNotification = asyncHandler(
  async (req, res) => {
    await deleteNotificationService(
      req.params.notificationId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Notification deleted successfully"
      )
    );
  }
);

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};