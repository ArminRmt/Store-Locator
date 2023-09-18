const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const baseURL =
  process.env.DEBUG === "true"
    ? "http://localhost:8081"
    : "https://storelocatorapi.dummy.monster";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "store-locator API Documentation",
      version: "0.1.0",
      description:
        "REST API made with Sequelize ORM, Express, and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Armin",
        url: baseURL,
        email: "arminrahmati83@gmail.com",
      },
    },
    servers: [
      {
        url: baseURL,
      },
    ],
  },
  apis: ["./SwaggerDocs/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpecs };
