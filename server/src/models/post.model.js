const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    sharesCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    visibility: {
      type: String,
      enum: [
        "public",
        "followers",
        "private",
      ],
      default: "public",
      index: true,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// INDEXES
// ======================================

postSchema.index({
  createdAt: -1,
});

postSchema.index({
  author: 1,
  createdAt: -1,
});

postSchema.index({
  visibility: 1,
  createdAt: -1,
});

postSchema.index({
  tags: 1,
});

postSchema.index({
  content: "text",
  tags: "text",
});

module.exports = mongoose.model(
  "Post",
  postSchema
);