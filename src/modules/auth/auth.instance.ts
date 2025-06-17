import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { userRepository } from "@/modules/user/user.instance";

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export {authService, authController};
