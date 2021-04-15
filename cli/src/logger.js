import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.align(),
    winston.format.printf(
      (info) => `${info.timestamp} - [${info.level}]: ${info.message}`
    )
  ),
  level: "info",
  transports: [
    // new winston.transports.File({ filename: "error.log", level: "error", maxSize: 500 }),
    // new winston.transports.File({ filename: "all.log", maxSize: 500 }),
    new winston.transports.Console(),
  ],
});

export default logger;
