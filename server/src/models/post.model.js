const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // ======================================================
    // CONTENT
    // ======================================================

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    // ======================================================
    // AUTHOR
    // ======================================================

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ======================================================
    // SOCIAL FEATURES
    // ======================================================

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
          maxlength: 500,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ======================================================
    // OPTIONAL FEATURES (FUTURE READY)
    // ======================================================

    isEdited: {
      type: Boolean,
      default: false,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);