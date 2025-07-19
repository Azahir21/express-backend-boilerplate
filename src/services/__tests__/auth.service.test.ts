import bcrypt from "bcrypt";
import { AuthService } from "../auth.service";
import { UserRepository } from "../../repositories/user.repository";
import { describe, it, expect, afterEach, beforeEach, jest } from "@jest/globals";

// Mock the UserRepository
jest.mock("../../repositories/user.repository");
const MockedUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = new MockedUserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        username: "newuser",
        email: "newuser@example.com",
        password: "password123",
      };

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const mockUser = {
        id: 1,
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockUserRepository.findByUsername.mockResolvedValue(null);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);

      const result = await authService.register(userData);

      expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(userData.username);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        username: userData.username,
        email: userData.email,
        password: expect.any(String),
        role: "user",
      });

      expect(result).toMatchObject({
        user: {
          id: mockUser.id,
          username: mockUser.username,
          email: mockUser.email,
          role: mockUser.role,
        },
        token: expect.any(String),
      });

      expect(result.user).not.toHaveProperty("password");
    });

    it("should throw error for duplicate username", async () => {
      const userData = {
        username: "existinguser",
        email: "new@example.com",
        password: "password123",
      };

      mockUserRepository.findByUsername.mockResolvedValue({} as any);

      await expect(authService.register(userData)).rejects.toThrow("Username already exists");

      expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(userData.username);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it("should throw error for duplicate email", async () => {
      const userData = {
        username: "newuser",
        email: "existing@example.com",
        password: "password123",
      };

      mockUserRepository.findByUsername.mockResolvedValue(null);
      mockUserRepository.findByEmail.mockResolvedValue({} as any);

      await expect(authService.register(userData)).rejects.toThrow("Email already exists");

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("should login with valid credentials", async () => {
      const loginData = {
        username: "testuser",
        password: "password123",
      };

      const hashedPassword = await bcrypt.hash(loginData.password, 10);
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockUserRepository.findByUsername.mockResolvedValue(mockUser);

      const result = await authService.login(loginData);

      expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(loginData.username);
      expect(result).toMatchObject({
        user: {
          id: mockUser.id,
          username: mockUser.username,
          email: mockUser.email,
          role: mockUser.role,
        },
        token: expect.any(String),
      });

      expect(result.user).not.toHaveProperty("password");
    });

    it("should throw error for invalid username", async () => {
      const loginData = {
        username: "nonexistent",
        password: "password123",
      };

      mockUserRepository.findByUsername.mockResolvedValue(null);

      await expect(authService.login(loginData)).rejects.toThrow("Invalid credentials");

      expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(loginData.username);
    });

    it("should throw error for invalid password", async () => {
      const loginData = {
        username: "testuser",
        password: "wrongpassword",
      };

      const hashedPassword = await bcrypt.hash("correctpassword", 10);
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockUserRepository.findByUsername.mockResolvedValue(mockUser);

      await expect(authService.login(loginData)).rejects.toThrow("Invalid credentials");
    });
  });
});
