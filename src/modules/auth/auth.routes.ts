import { Router } from 'express';
import { authController } from './auth.instance';
import { validateBody } from '@/middlewares/validateBody';
import { LoginSchema } from './auth.dto';

const router = Router();

router.post('/login', validateBody(LoginSchema), authController.login.bind(authController));

export default router;