export class ProductService {
  async create(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) {
    return prisma.product.create({ data });
  }
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      prisma.product.findMany({ skip, take: limit }),
      prisma.product.count(),
    ]);
    return { data: products, total, page, limit };
  }
}
