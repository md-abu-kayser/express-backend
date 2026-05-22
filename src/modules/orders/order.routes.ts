import { Router } from 'express';
import { OrderController } from './order.controller';
import { validate } from '@/middlewares/validate';
import { createOrderSchema, orderIdParam } from './order.validation';
import { authenticate, authorize } from '@/middlewares/auth';

const router = Router();
const controller = new OrderController();

router.use(authenticate);

router.post('/', validate(createOrderSchema), controller.create);
router.get('/my', controller.myOrders);
router.get('/all', authorize('ADMIN'), controller.allOrders);
router.get('/:id', validate(orderIdParam), controller.findById);

export default router;
