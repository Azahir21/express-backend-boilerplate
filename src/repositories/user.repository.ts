import { prisma } from "../database/database";
import { RegisterRequest } from "../types/auth.types";
import { User } from "../models/user.model";

export class UserRepository {
  async create(userData: RegisterRequest & { password: string; role?: string }): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
