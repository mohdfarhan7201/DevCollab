const { z } = require("zod");

// ======================================
// CREATE TEAM
// ======================================

const createTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Team name must be at least 3 characters")
    .max(50, "Team name cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

// ======================================
// UPDATE TEAM
// ======================================

const updateTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Team name must be at least 3 characters")
    .max(50, "Team name cannot exceed 50 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

// ======================================
// INVITE MEMBER
// ======================================

const inviteMemberSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

// ======================================
// REMOVE MEMBER
// ======================================

const removeMemberSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

module.exports = {
  createTeamSchema,
  updateTeamSchema,
  inviteMemberSchema,
  removeMemberSchema,
};