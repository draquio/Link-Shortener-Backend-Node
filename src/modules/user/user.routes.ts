import {Router} from "express"
import { userController } from "./user.instance";
import { validateBody } from "@/middlewares/validateBody";
import { UserCreateSchema, UserSetNewPasswordSchema, UserUpdateSchema } from "./user.dto";

const router = Router();

router.get("/", userController.getAll.bind(userController));
router.get("/:id", userController.getById.bind(userController));
router.post("/", validateBody(UserCreateSchema), userController.create.bind(userController));
router.put("/:id", validateBody(UserUpdateSchema), userController.update.bind(userController));
router.patch("/:id", validateBody(UserSetNewPasswordSchema), userController.setNewPassword.bind(userController));
router.delete("/:id", userController.delete.bind(userController));

export default router;