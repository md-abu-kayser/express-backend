import { prisma } from '@/database/prisma';
import { AppError } from '@/middlewares/errorHandler';
import { StatusCodes } from 'http-status-codes';

interface OrderItemInput {
  productId: string;
  quantity: number;
}

export class OrderService {
  async create(userId: string, items: OrderItemInput[]) {
    const order = await prisma.$transaction(async (tx) => {
      const productIds = items.map((i) => i.productId);
      const products = await tx.product.findMany({ where: { id: { in: productIds } } });
      const productMap = new Map(products.map((p) => [p.id, p]));

      const orderItemsData = [];
      let total = 0;

      for (const item of items) {
        const product = productMap.get(item.productId);
        if (!product) {
          throw new AppError(`Product with ID ${item.productId} not found`, StatusCodes.NOT_FOUND);
        }
        if (product.stock < item.quantity) {
          throw new AppError(
            `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}`,
            StatusCodes.CONFLICT,
          );
        }
        total += product.price * item.quantity;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });

        // Decrement stock
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: 'CONFIRMED',
          items: { create: orderItemsData },
        },
        include: {
          items: { include: { product: { select: { name: true, price: true } } } },
        },
      });
      return newOrder;
    });

    return order;
  }

  async findById(orderId: string, userId: string, userRole: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: { select: { name: true, price: true } } } } },
    });

    if (!order) throw new AppError('Order not found', StatusCodes.NOT_FOUND);
    if (order.userId !== userId && userRole !== 'ADMIN') {
      throw new AppError('Forbidden', StatusCodes.FORBIDDEN);
    }
    return order;
  }

  async findAllForUser(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: { select: { name: true, price: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(role: string) {
    if (role !== 'ADMIN') throw new AppError('Forbidden', StatusCodes.FORBIDDEN);
    return prisma.order.findMany({
      include: {
        user: { select: { email: true, name: true } },
        items: { include: { product: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
