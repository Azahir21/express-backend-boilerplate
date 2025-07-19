import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginRequest, RegisterRequest } from "../types/auth.types";
import { asyncHandler } from "../utils/asyncHandler";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const userData: RegisterRequest = req.body;
    const result = await this.authService.register(userData);

    res.status(201).json({
      status: "OK",
      message: "User registered successfully",
      data: result,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const loginData: LoginRequest = req.body;
    const result = await this.authService.login(loginData);

    res.json({
      status: "OK",
      message: "Login successful",
      data: result,
    });
  });

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const user = await this.authService.getProfile(userId);

    res.json({
      status: "OK",
      message: "Profile retrieved successfully",
      data: user,
    });
  });

  adminOnly = asyncHandler(async (req: Request, res: Response) => {
    res.json({
      status: "OK",
      message: "Admin access granted",
      data: {
        message: "This is an admin-only endpoint",
        user: req.user!.username,
      },
    });
  });
}
