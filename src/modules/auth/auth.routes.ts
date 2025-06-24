import { Router } from 'express';
import { authController } from './auth.instance';
import { validateBody } from '@/middlewares/validateBody.middleware';
import { ForgotPasswordSchema, LoginSchema, RefreshTokenSchema, RegisterSchema, ResetPasswordSchema, TokenSchema } from './auth.dto';
import { authMiddleware } from '@/middlewares/auth.middleware';

const router = Router();

router.post('/login', validateBody(LoginSchema), authController.login.bind(authController));
router.post('/register', validateBody(RegisterSchema), authController.register.bind(authController));
router.get("/verify-email", authController.verifyEmail.bind(authController));
router.post("/forgot-password", validateBody(ForgotPasswordSchema), authController.forgotPassword.bind(authController));
router.post("/reset-password", validateBody(ResetPasswordSchema), authController.resetPassword.bind(authController));
router.post("/refresh-token", validateBody(RefreshTokenSchema), authController.refreshToken.bind(authController));
router.post("/logout", validateBody(RefreshTokenSchema), authController.logout.bind(authController));
router.get("/me", authMiddleware, authController.me.bind(authController));

export default router;