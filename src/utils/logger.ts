import winston from "winston";

// Create logger without importing config to avoid circular dependency
const createLogger = (env: string = "development") => {
  const logFormat = winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), env === "development" ? winston.format.combine(winston.format.colorize(), winston.format.simple()) : winston.format.json());

  return winston.createLogger({
    level: env === "development" ? "debug" : "info",
    format: logFormat,
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: "logs/error.log", level: "error" }), new winston.transports.File({ filename: "logs/combined.log" })],
  });
};

// Initialize logger with environment variable directly
export const logger = createLogger(process.env.SERVER_ENV);
