import { Router } from 'express';
import userRoutes from './users/user.routes';
import productRoutes from './products/product.routes';
import orderRoutes from './orders/order.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;
