import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

// Create different Prisma instances for different environments
const createPrismaClient = () => {
  const isTest = process.env.NODE_ENV === "test";

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: isTest
      ? [] // Disable logging in tests to reduce noise
      : [
          {
            emit: "event",
            level: "query",
          },
          {
            emit: "event",
            level: "error",
          },
          {
            emit: "event",
            level: "info",
          },
          {
            emit: "event",
            level: "warn",
          },
        ],
  });

  // Only add event listeners in non-test environments
  if (!isTest) {
    // Log database queries in development
    if (process.env.NODE_ENV === "development") {
      prisma.$on("query", (e) => {
        logger.debug(`Query: ${e.query} Duration: ${e.duration}ms`);
      });
    }

    prisma.$on("error", (e) => {
      logger.error("Prisma Error:", e);
    });
  }

  return prisma;
};

export const prisma = createPrismaClient();
