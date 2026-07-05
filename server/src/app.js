const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
].filter(Boolean);

// =====================
// CORS (FINAL FIX)
// =====================
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ❌ IMPORTANT: NEVER RETURN FALSE SILENTLY
      return callback(new Error("CORS blocked"), false);
    },
    credentials: true,
  })
);

// =====================
// Core middlewares
// =====================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());

// =====================
// Swagger
// =====================
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// =====================
// Routes
// =====================
app.use("/api/v1", routes);

// =====================
// Error handler (IMPORTANT)
// =====================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.use(errorHandler);

module.exports = app;