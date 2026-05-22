import { Router } from 'express';
import { ProductController } from './product.controller';
import { validate } from '@/middlewares/validate';
import { createProductSchema, updateProductSchema, productIdParam, queryProductsSchema } from './product.validation';
import { authenticate, authorize } from '@/middlewares/auth';

const router = Router();
const controller = new ProductController();

// Public
router.get('/', validate(queryProductsSchema), controller.findAll);
router.get('/:id', validate(productIdParam), controller.findById);

// Admin only
router.post('/', authenticate, authorize('ADMIN'), validate(createProductSchema), controller.create);
router.put('/:id', authenticate, authorize('ADMIN'), validate(updateProductSchema), controller.update);
router.delete('/:id', authenticate, authorize('ADMIN'), validate(productIdParam), controller.delete);

export default router;
