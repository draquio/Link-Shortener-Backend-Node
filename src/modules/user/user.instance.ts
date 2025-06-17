import { UserController } from "./user.controller";
import { UserRepository } from "./user.respository";
import { UserService } from "./user.service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController, userService, userRepository };
