import express from "express";
import dotenv from "dotenv";
import path from "path";

// Load test environment
dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });
process.env.NODE_ENV = "test";

// Import after setting environment
import { authRoutes } from "../../src/routes/auth.routes";
import { adminRoutes } from "../../src/routes/admin.routes";
import { errorHandler } from "../../src/middleware/errorHandler";

export function createTestApp() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/admin", adminRoutes);

  // Health check
  app.get("/ping", (req, res) => {
    res.json({
      status: "OK",
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });

  // Error handling middleware
  app.use(errorHandler);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      status: "ERROR",
      message: "Route not found",
    });
  });

  return app;
}
