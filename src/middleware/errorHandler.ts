import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/apiError";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(error.message, {
    stack: error.stack,
    statusCode: error.statusCode,
    isOperational: error.isOperational,
    timestamp: new Date().toISOString(),
  });

  // Default error values
  let statusCode = 500;
  let message = "Internal server error";
  let status = "ERROR";

  // Handle known error types
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    status = "ERROR";
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    message = error.message;
    status = "ERROR";
  } else if (error.code === "P2002") {
    // Prisma unique constraint violation
    statusCode = 409;
    message = "Resource already exists";
    status = "ERROR";
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    status = "ERROR";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
    status = "ERROR";
  }

  // In test environment, ensure consistent error format
  if (process.env.NODE_ENV === "test") {
    return res.status(statusCode).json({
      status: "ERROR", // Always uppercase in tests
      message,
    });
  }

  // In development, include more details
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      status,
      message,
      stack: error.stack,
      details: error.details || null,
    });
  }

  // In production, minimal error info
  res.status(statusCode).json({
    status,
    message: statusCode === 500 ? "Internal server error" : message,
  });
};
