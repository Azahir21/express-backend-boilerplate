import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { seedDatabase } from "../database/seed";
import { logger } from "../utils/logger";

export class Container {
  private static instance: Container;

  public repositories: {
    userRepository: UserRepository;
  };

  public services: {
    authService: AuthService;
  };

  public controllers: {
    authController: AuthController;
  };

  private constructor() {
    // Initialize repositories
    this.repositories = {
      userRepository: new UserRepository(),
    };

    // Initialize services
    this.services = {
      authService: new AuthService(this.repositories.userRepository),
    };

    // Initialize controllers
    this.controllers = {
      authController: new AuthController(this.services.authService),
    };
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public static async initialize(): Promise<Container> {
    const container = Container.getInstance();

    // Seed database
    try {
      await seedDatabase();
      logger.info("Database seeded successfully");
    } catch (error) {
      logger.error("Failed to seed database:", error);
    }

    return container;
  }
}
