import { prisma } from '@/database/prisma';
import { AppError } from '@/middlewares/errorHandler';
import { StatusCodes } from 'http-status-codes';

export class ProductService {
  async create(data: { name: string; description: string; price: number; stock: number }) {
    return prisma.product.create({ data });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count(),
    ]);
    return {
      data: products,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Product not found', StatusCodes.NOT_FOUND);
    return product;
  }

  async update(id: string, updates: Partial<{ name: string; description: string; price: number; stock: number }>) {
    await this.findById(id);
    return prisma.product.update({ where: { id }, data: updates });
  }

  async delete(id: string) {
    await this.findById(id);
    await prisma.product.delete({ where: { id } });
  }
}
