import { Router } from 'express';
import { UserController } from './user.controller';
import { validate } from '@/middlewares/validate';
import { registerSchema, loginSchema, refreshTokenSchema } from './user.validation';
import { authenticate } from '@/middlewares/auth';

const router = Router();
const controller = new UserController();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.post('/refresh', validate(refreshTokenSchema), controller.refreshToken);
router.get('/profile', authenticate, controller.getProfile);

export default router;
