const Notification = require("../models/notification.model");

const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  link = "",
  metadata = {},
}) => {
  try {
    if (!recipient) return null;

    // Don't notify yourself
    if (
      sender &&
      recipient.toString() === sender.toString()
    ) {
      return null;
    }

    const notification =
      await Notification.create({
        recipient,
        sender,
        type,
        title,
        message,
        link,
        metadata,
      });

    return notification;
  } catch (error) {
    console.error(
      "Notification Error:",
      error.message
    );

    return null;
  }
};

module.exports = createNotification;