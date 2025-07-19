import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";
import { beforeAll, afterAll, beforeEach } from "@jest/globals";

// Load test environment variables first
dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });

process.env.NODE_ENV = "test";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

beforeAll(async () => {
  try {
    console.log("🗄️ Setting up test database...");

    // Connect to database
    await prisma.$connect();

    // Clean up existing data
    await cleanupAllData();

    console.log("✅ Test database setup completed");
  } catch (error) {
    console.error("❌ Test database setup failed:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    console.log("🧹 Cleaning up test database...");
    await cleanupAllData();
    await prisma.$disconnect();
    console.log("✅ Test cleanup completed");
  } catch (error) {
    console.error("❌ Test cleanup failed:", error);
  }
});

beforeEach(async () => {
  // Clean up data before each test
  await cleanupAllData();
});

async function cleanupAllData() {
  try {
    // Get all table names
    const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname='public'
    `;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== "_prisma_migrations")
      .map((name) => `"public"."${name}"`)
      .join(", ");

    if (tables.length > 0) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    }
  } catch (error) {
    // If tables don't exist yet, that's okay
    if (!error.message.includes("does not exist")) {
      console.error("Error cleaning test data:", error);
    }
  }
}

// Global error handler for tests
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

export { prisma };
