import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { userRepository } from "@/modules/user/user.instance";
import { AuthRepository } from "./auth.repository";
import { emailService } from "../email/email.instance";

const authRepository = new AuthRepository();
const authService = new AuthService(userRepository, emailService, authRepository);
const authController = new AuthController(authService);

export { authService, authController };
