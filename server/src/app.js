const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));

app.use(cookieParser());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api/v1", routes);

app.use(errorHandler);

module.exports = app;