const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "todo",
        "in-progress",
        "review",
        "done",
      ],
      default: "todo",
      index: true,
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "urgent",
      ],
      default: "medium",
      index: true,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    dueDate: {
      type: Date,
      default: null,
      index: true,
    },

    labels: [
      {
        type: String,
        trim: true,
      },
    ],

    attachments: [
      {
        url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "",
        },
      },
    ],

    order: {
      type: Number,
      default: 0,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// AUTO SET COMPLETED DATE
// ======================================

taskSchema.pre("save", function (next) {
  if (
    this.isModified("status") &&
    this.status === "done" &&
    !this.completedAt
  ) {
    this.completedAt = new Date();
  }

  if (
    this.isModified("status") &&
    this.status !== "done"
  ) {
    this.completedAt = null;
  }

  next();
});

// ======================================
// INDEXES
// ======================================

taskSchema.index({
  project: 1,
  status: 1,
  order: 1,
});

taskSchema.index({
  assignee: 1,
  status: 1,
});

taskSchema.index({
  createdBy: 1,
});

taskSchema.index({
  dueDate: 1,
});

taskSchema.index({
  labels: 1,
});

module.exports = mongoose.model(
  "Task",
  taskSchema
);