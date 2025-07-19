import bcrypt from "bcrypt";
import { prisma } from "./database";
import { config } from "../config/config";
import { logger } from "../utils/logger";

export async function seedDatabase() {
  try {
    // Check if admin user exists
    const existingAdmin = await prisma.user.findUnique({
      where: { username: config.admin.username },
    });

    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash(config.admin.password, 10);

      await prisma.user.create({
        data: {
          username: config.admin.username,
          email: config.admin.email,
          password: hashedPassword,
          role: "admin",
        },
      });

      logger.info(`Default admin user created (username: ${config.admin.username}, password: ${config.admin.password})`);
    }
  } catch (error) {
    logger.error("Error seeding database:", error);
    throw error;
  }
}
