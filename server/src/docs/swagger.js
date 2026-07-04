const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DevConnect API",
            version: "1.0.0",
            description: "Backend API Documentation",
        },
        servers: [
            {
                url: "http://localhost:8000/api/v1",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        "./src/routes/*.js",
    ],
};

module.exports = swaggerJsDoc(options);