import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { userRepository } from "@/modules/user/user.instance";
import { EmailService } from "../email/email.service";
import { AuthRepository } from "./auth.repository";

const authRepository = new AuthRepository();
const emailService = new EmailService();
const authService = new AuthService(userRepository, emailService, authRepository);
const authController = new AuthController(authService);

export {authService, authController};
