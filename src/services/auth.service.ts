import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { RegisterRequest, LoginRequest, AuthResponse, UserResponse } from "../types/auth.types";
import { config } from "../config/config";
import { ApiError } from "../utils/apiError";
import { User } from "@prisma/client";
import { SignOptions } from "jsonwebtoken";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Check if user exists
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new ApiError(409, "Username already exists");
    }

    const existingEmail = await this.userRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new ApiError(409, "Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: "user",
    });

    // Generate token
    const token = this.generateToken(user);

    return {
      token,
      user: this.toUserResponse(user),
    };
  }

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    // Try to find user by username first, then by email
    let user = await this.userRepository.findByUsername(loginData.username);
    if (!user) {
      user = await this.userRepository.findByEmail(loginData.username);
    }

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(loginData.password, user.password);
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      token,
      user: this.toUserResponse(user),
    };
  }

  async getProfile(userId: number): Promise<UserResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return this.toUserResponse(user);
  }

  private generateToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      String(config.jwt.secret),
      { expiresIn: config.jwt.expiresIn } as SignOptions
    );
  }

  private toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
