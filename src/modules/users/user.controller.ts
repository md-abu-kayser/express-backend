import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { StatusCodes } from "http-status-codes";

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

  async getProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // req.user is set by auth middleware
      const user = await prisma.user.findUnique({
        where: { id: req.user!.userId },
        select: { id: true, email: true, name: true, role: true },
      });
      if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND);
      return res.status(StatusCodes.OK).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
