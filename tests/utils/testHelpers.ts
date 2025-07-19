import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

interface CreateUserData {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}

let userCounter = 1;

export const testHelpers = {
  // Create test user with unique data
  async createTestUser(userData: CreateUserData = {}): Promise<User> {
    const defaultUser = {
      username: userData.username || `testuser${userCounter}`,
      email: userData.email || `test${userCounter}@example.com`,
      password: await bcrypt.hash(userData.password || "password123", 10),
      role: userData.role || "user",
    };

    userCounter++;

    return await prisma.user.create({
      data: defaultUser,
    });
  },

  // Create test admin with unique data
  async createTestAdmin(userData: CreateUserData = {}): Promise<User> {
    const defaultAdmin = {
      username: userData.username || `testadmin${userCounter}`,
      email: userData.email || `admin${userCounter}@test.com`,
      password: await bcrypt.hash(userData.password || "password123", 10),
      role: "admin",
    };

    userCounter++;

    return await prisma.user.create({
      data: defaultAdmin,
    });
  },

  // Generate JWT token for testing with actual username
  generateTestToken(userId: number, role: string = "user", username?: string): string {
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as jwt.SignOptions["expiresIn"],
    };
    return jwt.sign(
      {
        userId,
        username: username || `user${userId}`,
        role,
      },
      process.env.JWT_SECRET || "test-secret",
      options
    );
  },

  // Generate JWT token with custom expiry for testing
  generateTestTokenWithExpiry(userId: number, role: string = "user", expiresIn: string, username?: string): string {
    const options: SignOptions = { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] };
    return jwt.sign(
      {
        userId,
        username: username || `user${userId}`,
        role,
      },
      process.env.JWT_SECRET || "test-secret",
      options
    );
  },

  // Clean up test data
  async cleanupTestData(): Promise<void> {
    try {
      await prisma.user.deleteMany({});
      userCounter = 1; // Reset counter
    } catch (error) {
      console.error("Error cleaning up test data:", error);
    }
  },

  // Wait for async operations
  async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};
