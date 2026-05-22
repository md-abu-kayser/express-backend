import { Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { StatusCodes } from 'http-status-codes';
import { AuthenticatedRequest } from '@/middlewares/auth';

const orderService = new OrderService();

export class OrderController {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const order = await orderService.create(req.user!.userId, req.body.items);
      return res.status(StatusCodes.CREATED).json({ data: order });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const order = await orderService.findById(req.params.id, req.user!.userId, req.user!.role);
      return res.status(StatusCodes.OK).json({ data: order });
    } catch (error) {
      next(error);
    }
  }

  async myOrders(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.findAllForUser(req.user!.userId);
      return res.status(StatusCodes.OK).json({ data: orders });
    } catch (error) {
      next(error);
    }
  }

  async allOrders(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.findAll(req.user!.role);
      return res.status(StatusCodes.OK).json({ data: orders });
    } catch (error) {
      next(error);
    }
  }
}
