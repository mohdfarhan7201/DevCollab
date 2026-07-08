const { z } = require("zod");


// ======================================
// CREATE TASK VALIDATION
// ======================================

const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(200),

  description: z
    .string()
    .optional(),

  priority: z
    .enum([
      "low",
      "medium",
      "high",
      "urgent",
    ])
    .optional(),

  status: z
    .enum([
      "todo",
      "in-progress",
      "review",
      "done",
    ])
    .optional(),

  assignee: z
    .string()
    .nullable()
    .optional(),

  dueDate: z
    .string()
    .optional()
    .nullable(),

  labels: z
    .array(z.string())
    .optional(),
});


// ======================================
// UPDATE TASK VALIDATION
// ======================================

const updateTaskSchema = z.object({
  title: z
    .string()
    .max(200)
    .optional(),

  description: z
    .string()
    .optional(),

  priority: z
    .enum([
      "low",
      "medium",
      "high",
      "urgent",
    ])
    .optional(),

  status: z
    .enum([
      "todo",
      "in-progress",
      "review",
      "done",
    ])
    .optional(),

  assignee: z
    .string()
    .nullable()
    .optional(),

  dueDate: z
    .string()
    .nullable()
    .optional(),

  labels: z
    .array(z.string())
    .optional(),
});


// ======================================
// MOVE TASK VALIDATION
// ======================================

const moveTaskSchema = z.object({
  status: z.enum([
    "todo",
    "in-progress",
    "review",
    "done",
  ]),

  order: z
    .number()
    .min(0),
});


module.exports = {
  createTaskSchema,
  updateTaskSchema,
  moveTaskSchema,
};