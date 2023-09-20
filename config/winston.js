// npm install winston-daily-rotate-file
// const DailyRotateFile = require("winston-daily-rotate-file");
const winston = require("winston");
const { format, transports } = winston;

const logFormats = [format.timestamp(), format.json()];

// Create a logger instance
const logger = winston.createLogger({
  level: "info",
  format: format.combine(...logFormats),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    // Add Daily Rotate File transport if needed
    // new transports.DailyRotateFile({
    //   filename: "combined-%DATE%.log",
    //   datePattern: "YYYY-MM-DD",
    //   zippedArchive: true,
    //   maxSize: "20m", // Rotate after reaching 20 megabytes
    //   maxFiles: "14d", // Keep logs for 14 days
    // }),
  ],
});

// Add an error handler for unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Rejection: ${error.message} error: ${error}`);
});

module.exports = logger;
