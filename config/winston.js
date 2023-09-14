const winston = require("winston");
// npm install winston-daily-rotate-file
// const DailyRotateFile = require("winston-daily-rotate-file");

// Logger configuration
const loggerConfig = {
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    // new DailyRotateFile({
    //   filename: "combined-%DATE%.log",
    //   datePattern: "YYYY-MM-DD",
    //   zippedArchive: true,
    //   maxSize: "20m", // Rotate after reaching 20 megabytes
    //   maxFiles: "14d", // Keep logs for 14 days
    // }),
  ],
};

// Create a logger instance with the configuration
const logger = winston.createLogger(loggerConfig);

// Add an error handler for unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Rejection: ${error.message} error: ${error}`);
});

module.exports = { logger, loggerConfig };
