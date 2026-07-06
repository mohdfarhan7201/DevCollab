const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  getNotificationsService,
  markAsReadService,
  markAllReadService,
  deleteNotificationService,
  unreadCountService,
} = require("../services/notification.service");

// ======================================================
// GET MY NOTIFICATIONS
// ======================================================

const getNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const result = await getNotificationsService(
    req.user._id,
    page,
    limit
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Notifications fetched successfully",
      result
    )
  );
});

// ======================================================
// MARK AS READ
// ======================================================

const markAsRead = asyncHandler(async (req, res) => {
  const notification =
    await markAsReadService(
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
});

// ======================================================
// MARK ALL AS READ
// ======================================================

const markAllRead = asyncHandler(async (req, res) => {
  await markAllReadService(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "All notifications marked as read"
    )
  );
});

// ======================================================
// DELETE NOTIFICATION
// ======================================================

const deleteNotification =
  asyncHandler(async (req, res) => {
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
  });

// ======================================================
// UNREAD COUNT
// ======================================================

const unreadCount = asyncHandler(async (req, res) => {
  const count =
    await unreadCountService(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Unread notification count fetched",
      {
        unread: count,
      }
    )
  );
});

module.exports = {
  getNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
  unreadCount,
};