const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "follow",
        "project",
        "team",
        "message",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    link: {
      type: String,
      default: "",
    },

    read: {
      type: Boolean,
      default: false,
    },

    metadata: {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },

      comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },

      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },

      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);