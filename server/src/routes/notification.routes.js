const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
  getNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
  unreadCount,
} = require("../controllers/notification.controller");

// ======================================
// GET MY NOTIFICATIONS
// ======================================

router.get(
  "/",
  verifyJWT,
  getNotifications
);

// ======================================
// UNREAD COUNT
// ======================================

router.get(
  "/unread-count",
  verifyJWT,
  unreadCount
);

// ======================================
// MARK ALL READ
// ======================================

router.patch(
  "/read-all",
  verifyJWT,
  markAllRead
);

// ======================================
// MARK SINGLE READ
// ======================================

router.patch(
  "/:notificationId/read",
  verifyJWT,
  markAsRead
);

// ======================================
// DELETE
// ======================================

router.delete(
  "/:notificationId",
  verifyJWT,
  deleteNotification
);

module.exports = router;