import { UserRepository } from "../user.repository";
import { testHelpers } from "../../../tests/utils/testHelpers";
import { describe, it, expect, afterEach } from "@jest/globals";

const userRepository = new UserRepository();

describe("UserRepository", () => {
  afterEach(async () => {
    await testHelpers.cleanupTestData();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      const user = await userRepository.create(userData);

      expect(user).toMatchObject({
        id: expect.any(Number),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: "user",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe("findByUsername", () => {
    it("should find user by username", async () => {
      const testUser = await testHelpers.createTestUser({
        username: "finduser",
        email: "find@example.com",
      });

      const user = await userRepository.findByUsername("finduser");

      expect(user).toMatchObject({
        id: testUser.id,
        username: testUser.username,
        email: testUser.email,
      });
    });

    it("should return null for non-existent username", async () => {
      const user = await userRepository.findByUsername("nonexistent");
      expect(user).toBeNull();
    });
  });

  describe("findByEmail", () => {
    it("should find user by email", async () => {
      const testUser = await testHelpers.createTestUser({
        username: "emailuser",
        email: "email@example.com",
      });

      const user = await userRepository.findByEmail("email@example.com");

      expect(user).toMatchObject({
        id: testUser.id,
        username: testUser.username,
        email: testUser.email,
      });
    });

    it("should return null for non-existent email", async () => {
      const user = await userRepository.findByEmail("nonexistent@example.com");
      expect(user).toBeNull();
    });
  });

  describe("findById", () => {
    it("should find user by id", async () => {
      const testUser = await testHelpers.createTestUser({
        username: "iduser",
        email: "id@example.com",
      });

      const user = await userRepository.findById(testUser.id);

      expect(user).toMatchObject({
        id: testUser.id,
        username: testUser.username,
        email: testUser.email,
      });
    });

    it("should return null for non-existent id", async () => {
      const user = await userRepository.findById(99999);
      expect(user).toBeNull();
    });
  });
});
