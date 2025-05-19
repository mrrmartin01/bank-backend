const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Banking API",
      version: "1.0.0",
      description: "API docs for Banking backend",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/docs/*.js", "./src/models/*.js"], // paths to scan for docs
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
