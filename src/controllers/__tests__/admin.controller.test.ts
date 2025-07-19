import request from "supertest";
import { describe, it, expect, afterEach } from "@jest/globals";
import { createTestApp } from "../../../tests/utils/testApp";
import { testHelpers } from "../../../tests/utils/testHelpers";

const app = createTestApp();

describe("Admin Controller", () => {
  afterEach(async () => {
    await testHelpers.cleanupTestData();
  });

  describe("GET /api/v1/admin/test", () => {
    it("should allow access for admin users", async () => {
      const admin = await testHelpers.createTestAdmin();
      const token = testHelpers.generateTestToken(admin.id, "admin", admin.username);

      const response = await request(app).get("/api/v1/admin/test").set("Authorization", `Bearer ${token}`).expect(200);

      expect(response.body).toMatchObject({
        status: "OK",
        message: "Admin access granted",
        data: {
          message: "This is an admin-only endpoint",
          user: admin.username,
        },
      });
    });

    it("should deny access for regular users", async () => {
      const user = await testHelpers.createTestUser();
      const token = testHelpers.generateTestToken(user.id, "user", user.username);

      const response = await request(app).get("/api/v1/admin/test").set("Authorization", `Bearer ${token}`).expect(403);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Admin access required");
    });

    it("should deny access without token", async () => {
      const response = await request(app).get("/api/v1/admin/test").expect(401);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("No token provided");
    });
  });
});
