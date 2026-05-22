import { prisma } from "@/database/prisma";
import { AppError } from "@/middlewares/errorHandler";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/shared/jwt";

export class UserService {
  async register(email: string, password: string, name: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      throw new AppError("Email already registered", StatusCodes.CONFLICT);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);

    const payload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
}
