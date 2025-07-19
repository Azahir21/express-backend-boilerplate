import request from "supertest";
import { describe, it, expect, afterEach } from "@jest/globals";
import { createTestApp } from "../../../tests/utils/testApp";
import { testHelpers } from "../../../tests/utils/testHelpers";

const app = createTestApp();

describe("Auth Controller", () => {
  afterEach(async () => {
    await testHelpers.cleanupTestData();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        username: "newuser",
        email: "newuser@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/register").send(userData).expect(201);

      expect(response.body).toMatchObject({
        status: "OK",
        message: "User registered successfully",
        data: {
          user: {
            username: userData.username,
            email: userData.email,
            role: "user",
          },
        },
      });

      expect(response.body.data.user).not.toHaveProperty("password");
      expect(response.body.data).toHaveProperty("token");
    });

    it("should return 400 for invalid email format", async () => {
      const userData = {
        username: "testuser",
        email: "invalid-email",
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/register").send(userData).expect(400);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("email");
    });

    it("should return 400 for short password", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "123",
      };

      const response = await request(app).post("/api/v1/auth/register").send(userData).expect(400);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("password");
    });

    it("should return 409 for duplicate username", async () => {
      // Create user first
      await testHelpers.createTestUser({
        username: "duplicateuser",
        email: "first@example.com",
      });

      const userData = {
        username: "duplicateuser",
        email: "second@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/register").send(userData).expect(409);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Username already exists");
    });

    it("should return 409 for duplicate email", async () => {
      // Create user first
      await testHelpers.createTestUser({
        username: "firstuser",
        email: "duplicate@example.com",
      });

      const userData = {
        username: "seconduser",
        email: "duplicate@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/register").send(userData).expect(409);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Email already exists");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should login with valid credentials", async () => {
      const user = await testHelpers.createTestUser({
        username: "loginuser",
        email: "login@example.com",
      });

      const loginData = {
        username: "loginuser",
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/login").send(loginData).expect(200);

      expect(response.body).toMatchObject({
        status: "OK",
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
      });

      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data.user).not.toHaveProperty("password");
    });

    it("should login with email instead of username", async () => {
      const user = await testHelpers.createTestUser({
        username: "emailuser",
        email: "email@example.com",
      });

      const loginData = {
        username: "email@example.com", // Using email as username
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/login").send(loginData).expect(200);

      expect(response.body.data.user.id).toBe(user.id);
    });

    it("should return 401 for invalid username", async () => {
      const loginData = {
        username: "nonexistent",
        password: "password123",
      };

      const response = await request(app).post("/api/v1/auth/login").send(loginData).expect(401);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Invalid credentials");
    });

    it("should return 401 for invalid password", async () => {
      await testHelpers.createTestUser({
        username: "wrongpass",
        email: "wrongpass@example.com",
      });

      const loginData = {
        username: "wrongpass",
        password: "wrongpassword",
      };

      const response = await request(app).post("/api/v1/auth/login").send(loginData).expect(401);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Invalid credentials");
    });

    it("should return 400 for missing fields", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({}).expect(400);

      expect(response.body.status).toBe("ERROR");
    });
  });

  describe("GET /api/v1/auth/profile", () => {
    it("should get user profile with valid token", async () => {
      const user = await testHelpers.createTestUser();
      const token = testHelpers.generateTestToken(user.id, user.role, user.username);

      const response = await request(app).get("/api/v1/auth/profile").set("Authorization", `Bearer ${token}`).expect(200);

      expect(response.body).toMatchObject({
        status: "OK",
        message: "Profile retrieved successfully",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: expect.any(String), // Date is serialized as ISO string
          updatedAt: expect.any(String), // Date is serialized as ISO string
        },
      });

      // Verify dates are valid ISO strings
      expect(new Date(response.body.data.createdAt)).toBeInstanceOf(Date);
      expect(new Date(response.body.data.updatedAt)).toBeInstanceOf(Date);

      // Verify no password is returned
      expect(response.body.data).not.toHaveProperty("password");
    });

    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/v1/auth/profile").expect(401);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("No token provided");
    });

    it("should return 401 with invalid token", async () => {
      const response = await request(app).get("/api/v1/auth/profile").set("Authorization", "Bearer invalid-token").expect(401);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Invalid token");
    });

    it("should return 401 with expired token", async () => {
      const user = await testHelpers.createTestUser();
      // Generate a token with very short expiry
      const expiredToken = testHelpers.generateTestTokenWithExpiry(user.id, user.role, "1ms", user.username);

      // Wait for token to expire
      await testHelpers.wait(10);

      const response = await request(app).get("/api/v1/auth/profile").set("Authorization", `Bearer ${expiredToken}`).expect(401);

      expect(response.body.status).toBe("ERROR");
      expect(response.body.message).toContain("Invalid token");
    });
  });
});
