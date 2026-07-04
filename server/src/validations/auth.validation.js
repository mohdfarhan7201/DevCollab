const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(3).max(30),

    username: z
        .string()
        .min(3)
        .max(20),

    email: z
        .string()
        .email(),

    password: z
        .string()
        .min(8),
});

const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(1),
});

module.exports = {
    registerSchema,
    loginSchema,
};