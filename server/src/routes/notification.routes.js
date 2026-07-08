const express = require("express");

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notification.controller");

const auth = require("../middlewares/auth.middleware");

const router = express.Router();

// ======================================
// All routes require authentication
// ======================================

router.use(auth);

// GET /api/notifications
router.get("/", getMyNotifications);

// PATCH /api/notifications/read-all
router.patch(
  "/read-all",
  markAllAsRead
);

// PATCH /api/notifications/:notificationId/read
router.patch(
  "/:notificationId/read",
  markAsRead
);

// DELETE /api/notifications/:notificationId
router.delete(
  "/:notificationId",
  deleteNotification
);

module.exports = router;