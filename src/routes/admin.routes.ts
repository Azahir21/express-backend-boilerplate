import { Router } from "express";
import { Container } from "../container/container";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

export const adminRoutes = Router();

/**
 * @swagger
 * /api/v1/admin/test:
 *   get:
 *     summary: Admin only endpoint
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
adminRoutes.get("/test", authMiddleware, adminMiddleware, (req, res, next) => {
  Container.getInstance().controllers.authController.adminOnly(req, res, next);
});
