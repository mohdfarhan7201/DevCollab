const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use("/api/v1", routes);

app.use(errorHandler);

module.exports = app;
