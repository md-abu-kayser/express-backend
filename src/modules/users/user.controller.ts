import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { StatusCodes } from 'http-status-codes';
import { AuthenticatedRequest } from '@/middlewares/auth';
import { prisma } from '@/database/prisma';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const user = await userService.register(email, password, name);
      return res.status(StatusCodes.CREATED).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      return res.status(StatusCodes.OK).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.userId },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
      });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
      return res.status(StatusCodes.OK).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await userService.refreshAccessToken(refreshToken);
      return res.status(StatusCodes.OK).json({ data: result });
    } catch (error) {
      next(error);
    }
  }
}
