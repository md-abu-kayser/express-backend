import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import { StatusCodes } from 'http-status-codes';
import { AuthenticatedRequest } from '@/middlewares/auth';

const productService = new ProductService();

export class ProductController {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);
      return res.status(StatusCodes.CREATED).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query as unknown as { page: number; limit: number };
      const result = await productService.findAll(page, limit);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.findById(req.params.id);
      return res.status(StatusCodes.OK).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const product = await productService.update(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      await productService.delete(req.params.id);
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}
