// tests/integration/auth.integration.test.ts
import request from "supertest";
import { createTestApp } from "../utils/testApp";
import { testHelpers } from "../utils/testHelpers";
import { describe, it, expect, afterEach } from "@jest/globals";

const app = createTestApp();

describe("Authentication Integration Tests", () => {
  afterEach(async () => {
    await testHelpers.cleanupTestData();
  });

  describe("Full Authentication Flow", () => {
    it("should complete register -> login -> profile flow", async () => {
      // 1. Register a new user
      const registerData = {
        username: "flowuser",
        email: "flow@example.com",
        password: "password123",
      };

      const registerResponse = await request(app).post("/api/v1/auth/register").send(registerData).expect(201);

      expect(registerResponse.body.status).toBe("OK");
      const { token: registerToken } = registerResponse.body.data;

      // 2. Login with the same credentials
      const loginData = {
        username: registerData.username,
        password: registerData.password,
      };

      const loginResponse = await request(app).post("/api/v1/auth/login").send(loginData).expect(200);

      expect(loginResponse.body.status).toBe("OK");
      const { token: loginToken } = loginResponse.body.data;

      // 3. Get profile using login token
      const profileResponse = await request(app).get("/api/v1/auth/profile").set("Authorization", `Bearer ${loginToken}`).expect(200);

      expect(profileResponse.body.status).toBe("OK");
      expect(profileResponse.body.data).toMatchObject({
        username: registerData.username,
        email: registerData.email,
        role: "user",
      });

      // 4. Verify profile can also be accessed with register token
      const profileResponse2 = await request(app).get("/api/v1/auth/profile").set("Authorization", `Bearer ${registerToken}`).expect(200);

      expect(profileResponse2.body.status).toBe("OK");
    });

    it("should handle admin role properly", async () => {
      // 1. Register admin user through API instead of direct DB creation
      const adminData = {
        username: "integrationadmin",
        email: "admin@integration.com",
        password: "password123",
      };

      const registerResponse = await request(app).post("/api/v1/auth/register").send(adminData).expect(201);

      // 2. Update the user role to admin (simulating admin creation)
      // Note: In a real app, you'd have an admin endpoint or seed script for this
      const registeredUser = registerResponse.body.data.user;

      // Since we can't easily update via API, let's create admin directly but ensure it matches the expected flow
      const admin = await testHelpers.createTestAdmin({
        username: "testintegrationadmin",
        email: "testadmin@integration.com",
      });

      // 3. Login as admin
      const loginResponse = await request(app)
        .post("/api/v1/auth/login")
        .send({
          username: "testintegrationadmin",
          password: "password123",
        })
        .expect(200);

      const { token } = loginResponse.body.data;

      // 4. Access admin endpoint
      const adminResponse = await request(app).get("/api/v1/admin/test").set("Authorization", `Bearer ${token}`).expect(200);

      expect(adminResponse.body.data.user).toBe("testintegrationadmin");

      // 5. Regular profile access should also work
      const profileResponse = await request(app).get("/api/v1/auth/profile").set("Authorization", `Bearer ${token}`).expect(200);

      expect(profileResponse.body.status).toBe("OK");
      expect(profileResponse.body.data.role).toBe("admin");
      expect(profileResponse.body.data.username).toBe("testintegrationadmin");
    });
  });

  describe("Error Handling Integration", () => {
    it("should handle multiple validation errors", async () => {
      const invalidData = {
        username: "a", // Too short
        email: "invalid-email",
        password: "123", // Too short
      };

      const response = await request(app).post("/api/v1/auth/register").send(invalidData).expect(400);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toBeTruthy();
    });

    it("should handle database constraint violations", async () => {
      // Create user first
      await testHelpers.createTestUser({
        username: "constraintuser",
        email: "constraint@example.com",
      });

      // Try to create another user with same username
      const duplicateData = {
        username: "constraintuser",
        email: "different@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/register").send(duplicateData).expect(409);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Username already exists");
    });
  });
});
