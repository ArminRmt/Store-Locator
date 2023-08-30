// swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "store-locator api doc",
      version: "0.1.0",
      description:
        "rest api made with sequelize-orm, Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Armin",
        url: "https://storelocatorapi.dummy.monster",
        email: "arminrahmati83@gmail.com",
      },
    },
    servers: [
      {
        url: "https://storelocatorapi.dummy.monster",
      },
    ],
  },
  apis: ["./SwaggerDocs/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
