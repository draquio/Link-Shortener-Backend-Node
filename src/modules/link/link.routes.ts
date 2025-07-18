import { Router } from "express";
import { LinkCreateSchema, LinkUpdateSchema } from "./link.dto";
import { validateBody } from "@/middlewares/validateBody.middleware";
import { linkController } from "./link.instance";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();


router.post("/", authMiddleware, validateBody(LinkCreateSchema), linkController.create.bind(linkController));
router.get("/", authMiddleware, linkController.getAll.bind(linkController));
router.patch("/:id", authMiddleware, validateBody(LinkUpdateSchema), linkController.update.bind(linkController));
router.delete("/:id", authMiddleware, linkController.delete.bind(linkController));

export default router;